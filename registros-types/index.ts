export type RegistrosUser = {
  user: string
  password: string
}

export interface ITest {
  enfermedad: IResource
  dateTest: Date
  result: boolean
  attention: IAttention
}

export interface IResource {
  _id: string
  type: string
  name: string
  archived: boolean
}

export interface IPartner {
  _id: string
  codigo: String
  nombre: String
  apellidos: String
  fechanacimiento: Date
  sipcard: String
  correoelectronico: String
  telefono: String
  observaciones: String
  cosaspendientes: String
  sexo: IResource
  socioono: IResource
  nacionalidad: IResource
  ciudadresidencia: IResource
  edad: number
}

export interface IAttention {
  _id: string
  comentario: String
  fechaatencion: Date
  tipoaenciones: IResource[]
  Proyectos: IResource[]
  motivosatencion: IResource[]
  derivadoa: IResource[]
  derivadode: IResource[]
  formacion: IResource[]
  voluntariado: IResource[]
  diagnosticos: IResource[]
  lugaratencion: IResource | null
  cosaspendientes: String
  fechacosaspendientes: Date
  user: IPartner
  archived: Boolean
  tests: ITest[]
}
