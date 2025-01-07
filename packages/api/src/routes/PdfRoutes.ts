import { Hono } from 'hono'
import { signPdfService } from '../services/signPdfService'

export const pdfRoutes = new Hono()

pdfRoutes.post('/sign', async (c) => {
  try {
    const body = await c.req.parseBody()

    const pdfFile = body.pdf
    const p12File = body.p12
    const password = body.password

    if (!pdfFile || !p12File || !password || !(pdfFile instanceof File) || !(p12File instanceof File)) {
      return c.json({ error: 'Arquivos PDF, P12 e senha são obrigatórios' }, 400)
    }

    const signedPdf = await signPdfService(
      await pdfFile.arrayBuffer(),
      await p12File.arrayBuffer(),
      password as string,
    )

    return new Response(signedPdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="signed.pdf"',
      },
    })
  }
  catch (error: any) {
    return c.json({ error: error.message }, 500)
  }
})
