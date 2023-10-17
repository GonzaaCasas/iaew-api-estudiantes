import {EstudiantesController} from "./src/controller/ControllerEstudiantes";

export const AppRoutes = [

    {
        path: '/api/estudiantes/:id',
        method: 'get',
        action: EstudiantesController.obtenerEstudiantePorId
    },
    {
        path: '/api/estudiantes-post',
        method: 'post',
        action: EstudiantesController.nuevoEstudiante
    },
    {
        path: '/api/estudiantes',
        method: 'get',
        action: EstudiantesController.obtenerEstudiantes
    },
    {
        path: '/api/estudiantes-put/:id',
        method: 'put',
        action: EstudiantesController.actualizarEstudiante
    },
    {
        path: '/api/estudiantes-delete/:id',
        method: 'delete',
        action: EstudiantesController.eliminarEstudiante
    },
];