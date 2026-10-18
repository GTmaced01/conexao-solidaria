#include <stdio.h>

#define QUANTIDADE_PRECOS 10

void copiarVetor(const float origem[], float destino[], int tamanho) {
    for (int i = 0; i < tamanho; i++) {
        destino[i] = origem[i];
    }
}

void bubbleSort(float vetor[], int tamanho, int crescente) {
    for (int i = 0; i < tamanho - 1; i++) {
        int houveTroca = 0;

        for (int j = 0; j < tamanho - 1 - i; j++) {
            int foraDeOrdem = crescente
                ? vetor[j] > vetor[j + 1]
                : vetor[j] < vetor[j + 1];

            if (foraDeOrdem) {
                float temporario = vetor[j];
                vetor[j] = vetor[j + 1];
                vetor[j + 1] = temporario;
                houveTroca = 1;
            }
        }

        if (!houveTroca) {
            break;
        }
    }
}

void exibirPrecos(const char titulo[], const float precos[], int tamanho) {
    printf("\n%s\n", titulo);
    for (int i = 0; i < tamanho; i++) {
        printf("R$ %6.2f%s", precos[i], (i + 1) % 5 == 0 ? "\n" : "  ");
    }
}

int main(void) {
    /* Precos simulados de dez produtos de supermercado. */
    float precos[QUANTIDADE_PRECOS] = {
        8.49f, 5.79f, 23.90f, 4.29f, 12.50f,
        7.99f, 18.75f, 3.49f, 29.90f, 9.89f
    };
    float crescente[QUANTIDADE_PRECOS];
    float decrescente[QUANTIDADE_PRECOS];

    copiarVetor(precos, crescente, QUANTIDADE_PRECOS);
    copiarVetor(precos, decrescente, QUANTIDADE_PRECOS);

    bubbleSort(crescente, QUANTIDADE_PRECOS, 1);
    bubbleSort(decrescente, QUANTIDADE_PRECOS, 0);

    printf("=== CONEXAO SOLIDARIA ===\n");
    printf("Ordenacao de precos de produtos pelo metodo Bubble Sort\n");
    exibirPrecos("Precos originais:", precos, QUANTIDADE_PRECOS);
    exibirPrecos("Ordem crescente:", crescente, QUANTIDADE_PRECOS);
    exibirPrecos("Ordem decrescente:", decrescente, QUANTIDADE_PRECOS);

    return 0;
}
