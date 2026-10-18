#include <stdio.h>

#define DIAS_SEMANA 7

int main(void) {
    /* Vetores que relacionam cada dia ao respectivo consumo. */
    const char *dias[DIAS_SEMANA] = {
        "Segunda", "Terca", "Quarta", "Quinta",
        "Sexta", "Sabado", "Domingo"
    };
    int almocos[DIAS_SEMANA];
    int total = 0;
    int indiceMaior = 0;
    int indiceMenor = 0;

    printf("=== CONEXAO SOLIDARIA ===\n");
    printf("Controle semanal de almocos servidos\n\n");

    /* Leitura e validacao dos sete registros semanais. */
    for (int i = 0; i < DIAS_SEMANA; i++) {
        int leituraValida;
        int caractere;

        do {
            printf("Almocos servidos na %s: ", dias[i]);
            leituraValida = scanf("%d", &almocos[i]);

            if (leituraValida != 1) {
                while ((caractere = getchar()) != '\n' && caractere != EOF) {
                }
                printf("Entrada invalida. Digite um numero inteiro.\n");
            } else if (almocos[i] < 0) {
                printf("O valor nao pode ser negativo.\n");
            }
        } while (leituraValida != 1 || almocos[i] < 0);

        /* Acumula o total e identifica os extremos do periodo. */
        total += almocos[i];

        if (i == 0 || almocos[i] > almocos[indiceMaior]) {
            indiceMaior = i;
        }

        if (i == 0 || almocos[i] < almocos[indiceMenor]) {
            indiceMenor = i;
        }
    }

    /* O cast garante que a media preserve as casas decimais. */
    double mediaSemanal = (double) total / DIAS_SEMANA;

    /* Apresentacao final, incluindo o requisito bonus da media. */
    printf("\n=== RELATORIO SEMANAL ===\n");
    for (int i = 0; i < DIAS_SEMANA; i++) {
        printf("%-8s: %d almocos\n", dias[i], almocos[i]);
    }

    printf("\nTotal servido: %d almocos\n", total);
    printf("Media semanal: %.2f almocos por dia\n", mediaSemanal);
    printf("Maior consumo: %s (%d almocos)\n",
           dias[indiceMaior], almocos[indiceMaior]);
    printf("Menor consumo: %s (%d almocos)\n",
           dias[indiceMenor], almocos[indiceMenor]);

    return 0;
}
