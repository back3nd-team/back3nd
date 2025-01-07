import { Buffer } from 'node:buffer'
import { plainAddPlaceholder } from '@signpdf/placeholder-plain'
import { P12Signer } from '@signpdf/signer-p12'
import SignPdf from '@signpdf/signpdf'
import { PDFDocument } from 'pdf-lib'

interface SignOptions {
  reason: string
  contactInfo: string
  name: string
  location: string
}

export async function signPdfService(pdfData: Uint8Array | Buffer | ArrayBuffer, p12Buffer: ArrayBuffer, password: string, options: SignOptions) {
  try {
    // Validar PDF antes de processar
    const pdfDoc = await PDFDocument.load(pdfData)
    const pdfBytes = await pdfDoc.save({ useObjectStreams: false })
    const pdfBuffer = Buffer.from(pdfBytes)

    // Validar se o PDF está correto
    if (!pdfBuffer.includes(Buffer.from('%PDF-'))) {
      throw new Error('PDF inválido: cabeçalho não encontrado')
    }

    const p12 = Buffer.from(p12Buffer)

    try {
      const pdfWithPlaceholder = plainAddPlaceholder({
        pdfBuffer,
        reason: options.reason,
        contactInfo: options.contactInfo,
        name: options.name,
        location: options.location,
      })

      const signer = new P12Signer(p12, { passphrase: password })
      return await SignPdf.sign(pdfWithPlaceholder, signer)
    }
    catch (signError) {
      console.error('Erro na assinatura:', signError)
      throw new Error('Falha ao assinar o PDF. Verifique se o arquivo está correto.')
    }
  }
  catch (error) {
    console.error('Error signing PDF:', error)
    throw error
  }
}
