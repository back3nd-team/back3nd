import createInstructor from "@instructor-ai/instructor"
import OpenAI from "openai"
import { z } from "zod"
import type { TeacherData } from "./teacherService.ts"

console.log("API Key:", process.env.OPENAI_API_KEY)

const openai = new OpenAI ({
    apiKey: process.env.OPENAI_API_KEY
})

const client = createInstructor ({
    client: openai,
    mode: "TOOLS"
})

const lessonPlanSchema = z.object ({
    /*topic: z.string(),
    objectives: z.string(),
    materials: z.array(z.string()),
    activities: z.array(z.string()),
    assessment: z.string()*/
    subject: z.string(),
    topic: z.string(),
    objectives: z.string(),
    materials: z.array(z.string()),
    activities: z.array(z.string()),
    assessment: z.string()
})

// type LessonPlan = z.infer<typeof lessonPlanSchema>

const multiPlanSchema = z.object({
    plans: z.array(lessonPlanSchema),
})

type MultiPlan = z.infer<typeof multiPlanSchema>

export async function generateLessonPlan(teacherData:TeacherData): Promise<MultiPlan | null> {
    try {
        const lessonPlans = await client.chat.completions.create({
          messages: [
            {
              role: "system",
              content: "Você é um assistente educacional que ajuda professores a criar planos de aula.",
            },
            {
              role: "user",
              //content: `Crie um plano de aula para o professor ${teacherData.name} que ensina ${teacherData.subjects.join(", ")} para as turmas ${teacherData.classes.join(", ")}.`,
              content: `Crie um plano de aula separado para cada uma das matérias: ${teacherData.subjects.join(", ")}.
                        Cada item deve conter: subject, topic, objectives, materials[], activities[], assessment.
                        Nome do professor: ${teacherData.name}. Turmas: ${teacherData.classes.join(", ")}.
                        
                        Exemplo de formato esperado:
                    {
                      "plans": [
                        {
                          "subject": "Matemática",
                          "topic": "...",
                          "objectives": "...",
                          "materials": [],
                          "activities": [],
                          "assessment": "..."
                        },
                        {
                          "subject": "Física",
                          "topic": "...",
                          "objectives": "...",
                          "materials": [],
                          "activities": [],
                          "assessment": "..."
                        }
                      ]
                    }`
            },
          ],
          model: "gpt-3.5-turbo",
          response_model: { schema: multiPlanSchema, name: "Multiplan" },
        })
    
        console.log(lessonPlans)

        return lessonPlans
      } catch (error) {
        console.error("Erro ao gerar plano de aula:", error)
        return null
      }
}