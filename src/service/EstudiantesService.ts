import {Estudiante} from "../models/Estudiante";
import {estudiantesMock} from "../mock/mock-estudiantes";

export class EstudiantesService {

    private static instancia: EstudiantesService;
    private ultimoId: number;
    private listaEstudiantes: Estudiante[];

    private constructor() {
        this.listaEstudiantes = [...estudiantesMock];
        this.ultimoId = this.getLastId();
    }

    public static getInstance(): EstudiantesService {
        return this.instancia ? this.instancia : new EstudiantesService();
    }

    private getLastId(): number {
        let ultimoId = 0;
        this.listaEstudiantes.forEach(estudiante => {
            ultimoId = estudiante.id > ultimoId ? estudiante.id : ultimoId;
        });
        return ultimoId;
    }

    public getEstudiantes(): Promise<Estudiante[]> {
        return new Promise((resolve, reject) => {
           resolve(this.listaEstudiantes);
        });
    }

    public getEstudiantePorId(id: number): Promise<Estudiante> {
        return new Promise<Estudiante>((resolve, reject) => {
            const estudiante = this.listaEstudiantes.find(estudiante => estudiante.id === id);

            if (estudiante) {
                resolve(estudiante);
            } else {
                reject(new Error('No se encontró el estudiante con el id solicitado.'));
            }
        });
    }

    public addEstudiante(estudiante: Estudiante): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            try {
                estudiante.id = ++this.ultimoId;
                this.listaEstudiantes.push(estudiante);
                resolve(true);
            } catch (err) {
                console.log(err);
                reject(new Error('Error al intentar crear estudiante.'));
            }
        });
    }

    public updateEstudiante(id: number, datosEstudiante: Estudiante): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const estudiante = this.listaEstudiantes.find(estudiante => estudiante.id === id);
            if (estudiante) {
                estudiante.apellido = datosEstudiante.apellido || estudiante.apellido;
                estudiante.nombre = datosEstudiante.nombre || estudiante.nombre;
                estudiante.correoElectronico = datosEstudiante.correoElectronico || estudiante.correoElectronico;
                resolve(true);
            } else {
                reject(new Error('No se encontró el estudiante con el id solicitado.'));
            }
        });
    }

    public deleteEstudiante(id: number): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const indice = this.listaEstudiantes.findIndex(est => est.id === id);
            if (indice != -1) {
                this.listaEstudiantes.splice(indice, 1);
                resolve(true);
            } else {
                reject(new Error('No se encontró el estudiante con el id solicitado.'));
            }
        });
    }
}