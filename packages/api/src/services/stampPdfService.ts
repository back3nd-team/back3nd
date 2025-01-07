import type { PDFFont, PDFPage } from 'pdf-lib'
import path from 'node:path'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

interface StampOptions {
  maxWidth?: number
  stampImageBuffer?: ArrayBuffer // Novo campo para receber o buffer da imagem
  opacity?: number
  bottomMargin?: number
  showBorder?: boolean // Nova opção
  signOptions?: {
    reason?: string
    contactInfo?: string
    name?: string
    location?: string
  }
}

interface DrawTextOptions {
  text: string
  x: number
  y: number
  size: number
  maxWidth: number
  font?: PDFFont // Adicionando opção de fonte
}

function splitTextIntoLines(text: string, page: PDFPage, fontSize: number, maxWidth: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let currentLine = ''
  const font = page.doc.embedStandardFont(StandardFonts.Helvetica)

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word
    const width = font.widthOfTextAtSize(testLine, fontSize)

    if (width <= maxWidth) {
      currentLine = testLine
    }
    else {
      if (currentLine)
        lines.push(currentLine)
      currentLine = word
    }
  }

  if (currentLine) {
    lines.push(currentLine)
  }

  return lines
}

function drawTextOnPage(page: PDFPage, options: DrawTextOptions) {
  const { text, x, y, size, maxWidth, font = page.doc.embedStandardFont(StandardFonts.Helvetica) } = options
  const lines = splitTextIntoLines(text, page, size, maxWidth)
  let currentY = y
  const lineHeight = size + 4

  lines.forEach((line) => {
    const textWidth = font.widthOfTextAtSize(line, size)
    const centerX = x + (maxWidth - textWidth) / 2

    page.drawText(line, {
      x: centerX,
      y: currentY,
      size,
      font, // Usando a fonte especificada
      color: rgb(0, 0, 0),
    })
    currentY -= lineHeight
  })

  return lineHeight * lines.length
}

function drawBorder(page: PDFPage, x: number, y: number, width: number, height: number) {
  const borderColor = rgb(0.7, 0.7, 0.7) // Cinza claro
  const lineWidth = 0.2 // Linha bem fina

  // Desenhar as quatro bordas com linhas contínuas
  page.drawLine({
    start: { x, y },
    end: { x: x + width, y },
    thickness: lineWidth,
    color: borderColor,
  })
  page.drawLine({
    start: { x: x + width, y },
    end: { x: x + width, y: y + height },
    thickness: lineWidth,
    color: borderColor,
  })
  page.drawLine({
    start: { x: x + width, y: y + height },
    end: { x, y: y + height },
    thickness: lineWidth,
    color: borderColor,
  })
  page.drawLine({
    start: { x, y: y + height },
    end: { x, y },
    thickness: lineWidth,
    color: borderColor,
  })
}

export async function stampPdfService(
  pdfBuffer: ArrayBuffer,
  options: StampOptions = {},
) {
  try {
    const {
      maxWidth = 150,
      stampImageBuffer,
      opacity = 0.2,
      bottomMargin = 100,
      showBorder = true, // Valor padrão true para manter compatibilidade
      signOptions = {},
    } = options

    const pdfDoc = await PDFDocument.load(new Uint8Array(pdfBuffer))

    // Se não houver buffer customizado, usa a imagem padrão
    const stampImageBytes = stampImageBuffer || await Bun.file(path.resolve(__dirname, '../assets/softagon.png')).arrayBuffer()
    const stampImage = await pdfDoc.embedPng(stampImageBytes)

    const imgDimensions = stampImage.scale(1)

    const scale = Math.min(maxWidth / imgDimensions.width, 1)
    const width = imgDimensions.width * scale
    const height = imgDimensions.height * scale

    const pages = pdfDoc.getPages()
    const lastPage = pages[pages.length - 1]
    const { width: pageWidth, height: _pageHeight } = lastPage.getSize()

    // Posição base para o texto e imagem
    const baseX = (pageWidth - width) / 2
    const baseY = bottomMargin

    const margin = showBorder ? 5 : 0 // Margem só se tiver borda
    const borderWidth = width + (margin * 2)
    const borderHeight = height + (margin * 2)
    const borderX = baseX - margin
    const borderY = baseY - margin

    // Desenhar a borda apenas se showBorder for true
    if (showBorder) {
      drawBorder(lastPage, borderX, borderY, borderWidth, borderHeight)
    }

    // Depois a imagem
    lastPage.drawImage(stampImage, {
      x: baseX,
      y: baseY,
      width,
      height,
      opacity,
    })

    const fontSize = 8
    let currentY = baseY + (height / 2) + 10
    const dateNow = new Date().toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    // Array de textos a serem renderizados
    // First define both fonts
    const regularFont = lastPage.doc.embedStandardFont(StandardFonts.Helvetica)
    const boldFont = lastPage.doc.embedStandardFont(StandardFonts.HelveticaBold)

    const textsToRender = [
      { text: 'Assinado digitalmente por ', font: regularFont },
      { text: `${signOptions.name?.toUpperCase()}`, font: boldFont },
      { text: `em ${dateNow}`, font: regularFont },
    ].filter(text => text.text)

    textsToRender.forEach((textObj) => {
      if (textObj) {
        currentY -= drawTextOnPage(lastPage, {
          text: textObj.text,
          x: baseX,
          y: currentY,
          size: fontSize,
          maxWidth: width,
          font: textObj.font, // Passando a fonte para a função
        })
      }
    })

    return await pdfDoc.save({
      useObjectStreams: false,
      addDefaultPage: false,
      updateFieldAppearances: false,
    })
  }
  catch (error) {
    console.error('Erro ao adicionar carimbo ao PDF:', error)
    throw error
  }
}
