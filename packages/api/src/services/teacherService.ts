export type TeacherData = {
    teacherId: string;
    name: string;
    classes: string[];
    subjects: string[];
  };
  
  const teacherDatabase: Record<string, TeacherData> = {
    "prof123": {
      teacherId: "prof123",
      name: "Professor Fulano de Tal",
      classes: ["Turma A", "Turma B"],
      subjects: ["Matemática", "Física"],
    },
    "prof456": {
      teacherId: "prof456",
      name: "Professora Maria Silva",
      classes: ["Turma C", "Turma D"],
      subjects: ["Geografia"],
    },
    "prof789": {
      teacherId: "prof789",
      name: "Professor João Pereira",
      classes: ["Turma E", "Turma F"],
      subjects: ["Química", "Biologia"],
    },
    "prof321": {
      teacherId: "prof321",
      name: "Professora Ana Costa",
      classes: ["Turma G"],
      subjects: ["Português", "Literatura"],
    },
  };
  
  export function getTeacherData(teacherId: string): TeacherData | null {
    return teacherDatabase[teacherId] || null;
  }
  