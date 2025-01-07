import { Buffer } from 'node:buffer'
import { plainAddPlaceholder } from '@signpdf/placeholder-plain'
import { P12Signer } from '@signpdf/signer-p12'
import SignPdf from '@signpdf/signpdf'

export async function signPdfService(pdfBuffer: ArrayBuffer, p12Buffer: ArrayBuffer, password: string) {
  // Crie instâncias dos buffers
  const pdf = Buffer.from(pdfBuffer)
  const p12 = Buffer.from(p12Buffer)
  // Adicionar placeholder ao PDF
  const pdfWithPlaceholder = plainAddPlaceholder({
    pdfBuffer: pdf,
    reason: 'Assinatura digital com JavaScript.',
    contactInfo: 'email@exemplo.com',
    name: 'Hermes',
    location: 'Brasil',
  })

  // Instanciar o P12Signer
  const signer = new P12Signer(p12, { passphrase: password })

  // Assinar o PDF
  try {
    const signedPdf = await SignPdf.sign(pdfWithPlaceholder, signer)
    return signedPdf
  }
  catch (error) {
    console.error('Error signing PDF:', error)
    throw error
  }
}
