import { Controller, HttpRequest, HttpResponse } from "../../interfaces";

export class CriarPratoController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { nome, cozinha, descricao_resumida, descricao_detalhada, imagem, valor } = httpRequest.body;
    
        // Simulação de criação de prato
        const novoPrato = {
        id: Math.floor(Math.random() * 1000), // Simulando um ID gerado
        nome,
        cozinha,
        descricao_resumida,
        descricao_detalhada,
        imagem,
        valor
        };
    
        return {
        statusCode: 201,
        body: novoPrato
        };
    }
}