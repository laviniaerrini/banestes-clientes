import Papa from "papaparse";

// Endereço base da planilha. Só o nome da aba no final é que muda.
const URL_BASE =
  "https://docs.google.com/spreadsheets/d/1LkyaeCgiyaIN1IxXnbZQPmVMIcht3PIxMDUXHsvczK0/gviz/tq?tqx=out:csv&sheet=";

// Uma linha do CSV logo após o parsing: nomes das colunas e valores, tudo em texto.
export type LinhaCsv = Record<string, string>;

// Busca uma aba da planilha e devolve suas linhas como uma lista de objetos.
export async function buscarAba(nomeAba: string): Promise<LinhaCsv[]> {
  // 1. Faz o pedido GET para o endereço da aba e espera a resposta chegar.
  const resposta = await fetch(URL_BASE + nomeAba);

  // 2. Se a resposta não veio com sucesso, interrompe e avisa o erro.
  if (!resposta.ok) {
    throw new Error(`Erro ao buscar a aba "${nomeAba}". Código: ${resposta.status}`);
  }

  // 3. "Abre o pacote": lê o conteúdo da resposta como texto (o CSV).
  const texto = await resposta.text();

  // 4. Transforma o texto CSV em uma lista de objetos.
  //    header: usa a primeira linha como nomes dos campos.
  //    skipEmptyLines: ignora linhas vazias.
  const resultado = Papa.parse<LinhaCsv>(texto, {
    header: true,
    skipEmptyLines: true,
  });

  // 5. Devolve só a lista de linhas.
  return resultado.data;
}
