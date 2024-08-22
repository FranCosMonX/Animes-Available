# Animes Available

Projeto criado para consolidar os conceitos vistos durante as aulas assincronas vistas na plataforma da Proz - Talentos Cloud.

O objetivo inicial da aplicação é colher avaliações de vários usuários cadastrados de alguns títulos já existentes no sistema.

Animes Available é um sistema completo tendo o backend separado do frontend. Ambos os subsistemas podem ser encontrados neste repositório, sendo [AnimesAvailable](./AnimesAvailable/) o frontend e [animes-available](./animes-available/) o backend com cada um possuindo sua própria documentação e configuração. Vale ressaltar a documentação detalhada da API até a versão atual da aplicação pode ser encontrada no [Postman](https://elements.getpostman.com/redirect?entityId=27413236-1a73bc01-7075-4faa-8e4f-96b2b19c1aa0&entityType=collection).

## Estrutura

A versão atual implementa as funcionalidades de Login e Cadastro de usuário. Vale ressaltar que a autenticação do usuário é feita por meio de usuário e senha, gerando um token JWT a ser usado nas futuras requisições. Este token expira em 3 minutos na versão atual, uma vez que o foco inicial é completar as features de cadastro e login de usuário. Logo a seguir pode ser visto as funcionalidades implementadas atualmente.

<div align="center">
  <img src="./src/UML/img/diagramaDeCasoDeUso.png" alt="Diagrama de casos de uso contendo as features implementadas até o momento" />
</div>
<p align="center">Diagrama de Caso de Uso.</p>

# Créditos

Durante o desenvolvimento da aplicação, algumas ferramentas ou referências foram usadas, não só para desenvolvimento da aplicação mas também para a documentação da própria.

- A construção dos diagramas foram feitos usando o editor online [plantuml.mseiche.de](https://plantuml.mseiche.de/).
- Os códigos SQL foram implementados e executados no compilador online [sqliteonline.com](https://sqliteonline.com/)
- A documentação da API foi feita no Postman.