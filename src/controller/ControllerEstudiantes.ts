import {Request, Response} from "express";
import {HttpCodes} from "../enums/HttpCodes";
import {EstudiantesService} from "../service/EstudiantesService";

// Creo la instancia de estudiantesServices
const _estudiantesServices = EstudiantesService.getInstance();

async function obtenerEstudiantes(request: Request, response: Response) {
    _estudiantesServices.getEstudiantes()
        .then(estudiantes => {
            return response.status(HttpCodes.OK).json(estudiantes);
        })
        .catch(error => {
        return response.status(HttpCodes.NOT_FOUND).json(error.message);
    });

}

async function obtenerEstudiantePorId(request: Request, response: Response) {
    const idEstudiante = +request.params.id;

     _estudiantesServices.getEstudiantePorId(idEstudiante)
         .then(estudiante => {
             return response.status(HttpCodes.OK).json(estudiante)
         })
         .catch(error => {
             return response.status(HttpCodes.NOT_FOUND).json(error.message);
         });
}

async function nuevoEstudiante(request: Request, response: Response) {
     _estudiantesServices.addEstudiante(request.body)
         .then(estudiante => {
             return response.status(HttpCodes.OK).json(estudiante)
         })
         .catch(error => {
             return response.status(HttpCodes.NOT_FOUND).json(error.message);
         });
}

async function actualizarEstudiante(request: Request, response: Response) {
    const idEstudiante = +request.params.id;
    const datosEstudiante = request.body;

     _estudiantesServices.updateEstudiante(idEstudiante, datosEstudiante)
         .then(estudiante => {
             return response.status(HttpCodes.OK).json(estudiante)
         })
         .catch(error => {
             return response.status(HttpCodes.NOT_FOUND).json(error.message);
         });
}

async function eliminarEstudiante(request: Request, response: Response) {
    const idEstudiante = +request.params.id;

     _estudiantesServices.deleteEstudiante(idEstudiante)
         .then(estudiante => {
             return response.status(HttpCodes.OK).json(estudiante)
         })
         .catch(error => {
             return response.status(HttpCodes.NOT_FOUND).json(error.message);
         });
}


export const EstudiantesController = {
    obtenerEstudiantes,
    obtenerEstudiantePorId,
    nuevoEstudiante,
    actualizarEstudiante,
    eliminarEstudiante
};