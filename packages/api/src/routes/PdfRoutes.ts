import { Hono } from 'hono'
import { signPdfService } from '../services/signPdfService'
import { stampPdfService } from '../services/stampPdfService'

export const pdfRoutes = new Hono()

/**
 * @api {post} /sign Sign and Stamp PDF
 * @apiName SignPDF
 * @apiDescription Signs a PDF file with a digital certificate and adds a stamp to the last page
 *
 * @apiBody {File} pdf The PDF file to be signed (required)
 * @apiBody {File} p12 The P12/PFX digital certificate file (required)
 * @apiBody {string} password The password for the P12/PFX certificate (required)
 *
 * @apiBody {number} [maxWidth=150] Maximum width for the stamp image in pixels
 * @apiBody {number} [opacity=0.5] Stamp opacity (0 to 1)
 * @apiBody {number} [bottomMargin=100] Bottom margin for stamp placement in pixels
 * @apiBody {boolean} [showBorder=true] Whether to show a border around the stamp
 * @apiBody {File} [stampImage] Custom stamp image file (PNG format)
 *
 * @apiBody {string} [reason="Assinatura digital Softagon Sistemas."] Reason for signing
 * @apiBody {string} [contactInfo="fale@softagon.com.br"] Contact information
 * @apiBody {string} [name="Softagon Sistemas"] Signer's name
 * @apiBody {string} [location="Pernambuco, Brasil"] Signing location
 *
 * @apiSuccess {File} pdf Signed PDF file with stamp
 *
 * @apiExample {curl} Example usage:
 * curl -X POST http://your-api/sign \
 *   -F "pdf=@document.pdf" \
 *   -F "p12=@certificate.p12" \
 *   -F "password=your-p12-password" \
 *   -F "maxWidth=200" \
 *   -F "opacity=0.7" \
 *   -F "showBorder=false" \
 *   -F "name=John Doe" \
 *   -F "location=New York, USA"
 *
 * @apiError (400) {Object} error Invalid or missing required files/parameters
 * @apiError (500) {Object} error Processing error with details
 */
pdfRoutes.post('/sign', async (c) => {
  try {
    const body = await c.req.parseBody()

    const pdfFile = body.pdf
    const p12File = body.p12
    const password = body.password
    const stampImage = body.stampImage as File | undefined

    // Extrair parâmetros opcionais do carimbo
    const stampOptions = {
      maxWidth: body.maxWidth ? Number(body.maxWidth) : undefined,
      opacity: body.opacity ? Number(body.opacity) : undefined,
      bottomMargin: body.bottomMargin ? Number(body.bottomMargin) : undefined,
      showBorder: body.showBorder ? body.showBorder === 'true' : undefined,
      stampImageBuffer: stampImage ? await stampImage.arrayBuffer() : undefined,
    }

    // Extrair parâmetros opcionais da assinatura
    const signOptions = {
      reason: body.reason as string || 'Assinatura digital Softagon Sistemas.',
      contactInfo: body.contactInfo as string || 'fale@softagon.com.br',
      name: body.name as string || 'Softagon Sistemas',
      location: body.location as string || 'Pernambuco, Brasil',
    }

    if (!pdfFile || !p12File || !password || !(pdfFile instanceof File) || !(p12File instanceof File)) {
      return c.json({ error: 'Arquivos PDF, P12 e senha são obrigatórios' }, 400)
    }

    const pdfArrayBuffer = await pdfFile.arrayBuffer()
    let processedPdf

    try {
      // Passar opções para o stampPdfService incluindo as informações de assinatura
      const stampedPdfData = await stampPdfService(pdfArrayBuffer, {
        ...stampOptions,
        signOptions,
      })

      // Tentar assinar o PDF carimbado
      processedPdf = await signPdfService(
        stampedPdfData,
        await p12File.arrayBuffer(),
        password as string,
        signOptions,
      )
    }
    catch (processError) {
      console.error('Erro no processamento:', processError)
      throw new Error('Falha ao processar o PDF. Verifique se o arquivo está íntegro.')
    }

    return new Response(processedPdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="signed.pdf"',
      },
    })
  }
  catch (error: any) {
    console.error('Erro detalhado:', error)
    return c.json({
      error: 'Erro no processamento do PDF',
      details: error.message,
    }, 500)
  }
})
