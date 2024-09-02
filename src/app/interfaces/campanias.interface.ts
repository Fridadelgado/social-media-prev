export interface GenericResponse<T> {
    status: number;
    body: T;
    headers: Headers;
  }
  
  export interface CampaniasBody {
    data: Campanias[]
  }
  
  export interface Campanias {
    idsubcampanas: number
    nombrecampana: string
    status: number
    idredsocial: number
    idpublicacion: number
    idusuario: number
    iddistribuidor: number
    fechainicio: string
    fechafin: string
  }
  
  export interface Headers {
    "Content-Type": string
  }
  