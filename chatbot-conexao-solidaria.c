#include <locale.h>
#include <stdio.h>

int main(void) {
    int opcao = -1;
    int leituraValida;
    int caractere;

    setlocale(LC_ALL, "");

    printf("========================================\n");
    printf("  CHATBOT DA CONEXAO SOLIDARIA\n");
    printf("========================================\n");
    printf("Bem-vindo! Este sistema oferece informacoes sobre projetos, doacoes e voluntariado.\n");
    printf("Escolha uma opcao do menu para iniciar o atendimento.\n");

    do {
        printf("\n---------- MENU PRINCIPAL ----------\n");
        printf("1 - Conhecer os projetos\n");
        printf("2 - Como fazer uma doacao\n");
        printf("3 - Participar como voluntario\n");
        printf("4 - Canais de contato\n");
        printf("0 - Encerrar atendimento\n");
        printf("Escolha uma opcao: ");

        leituraValida = scanf("%d", &opcao);

        if (leituraValida != 1) {
            printf("Entrada invalida. Digite somente o numero da opcao desejada.\n");
            while ((caractere = getchar()) != '\n' && caractere != EOF) {
                /* Descarta os caracteres invalidos da entrada. */
            }
            opcao = -1;
            continue;
        }

        switch (opcao) {
            case 1:
                printf("\nProjetos atuais: Cesta Solidaria, Inclusao Digital e Rede de Voluntarios.\n");
                break;
            case 2:
                printf("\nPara doar, acesse a area 'Quero colaborar' e selecione a opcao Doador.\n");
                break;
            case 3:
                printf("\nPara ser voluntario, preencha o cadastro e informe sua disponibilidade.\n");
                break;
            case 4:
                printf("\nEntre em contato pelos canais oficiais informados no site Conexao Solidaria.\n");
                break;
            case 0:
                printf("\nAtendimento encerrado. Obrigado por apoiar a Conexao Solidaria!\n");
                break;
            default:
                printf("\nOpcao inexistente. Escolha um numero entre 0 e 4.\n");
        }
    } while (opcao != 0);

    return 0;
}
