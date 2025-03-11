import { Hono } from "hono"
import { Jwt } from "hono/utils/jwt"
import { getTeacherData } from "../services/teacherService"
import { generateLessonPlan } from "../services/lessonPlanService"

const app = new Hono()

app.get('/', async (c) => {
    const authHeader = c.req.header('Authorization')
    if (!authHeader) {
        return c.json({ error: 'Authorization header missing' }, 401)
    }

    const token = authHeader.replace('Bearer ', '')

    console.log (token)

    try {
        
        const payload = await Jwt.verify(token, 'AOICSXE1OmY8vbhkHh5UU3NlW9DmzH6G') as { id: string }
        const teacherId = payload.id    

        const teacherInfo = getTeacherData(teacherId)
        if (!teacherInfo) {
            return c.json({ error: 'Teacher not found' }, 404)
        }

        const lessonPlan = await generateLessonPlan(teacherInfo)
        if (!lessonPlan) {
            return c.json({ error: 'Failed to generate lesson plan' }, 500)
        }
        
        return c.json({ teacherInfo, lessonPlan })
    } catch (error) {
        console.log('Erro ao verificar token:', error)
        return c.json({ error: 'Invalid Token'}, 401)
    }
})

app.get('/ping', (c) => c.text('Teacher route is up!'))

export default app