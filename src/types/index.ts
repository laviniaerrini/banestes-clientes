// Molde de um cliente do banco.
// Pode ser pessoa física (CPF) ou pessoa jurídica (CNPJ).
export interface Cliente {
  id: string; // identificador único do cliente
  cpfCnpj: string; // texto, pois pode começar com zero e ter pontos e traço
  rg?: string; // opcional: empresas (CNPJ) não têm RG
  dataNascimento: Date;
  nome: string;
  nomeSocial?: string; // opcional: nem todo cliente tem nome social
  email: string;
  endereco: string;
  rendaAnual: number;
  patrimonio: number;
  estadoCivil: "Solteiro" | "Casado" | "Viúvo" | "Divorciado"; // só uma destas 4 opções
  codigoAgencia: number; // liga o cliente à sua agência (Agencia.codigo)
}

// Molde de uma conta bancária.
export interface Conta {
  id: string;
  cpfCnpjCliente: string; // liga a conta ao seu dono (Cliente.cpfCnpj)
  tipo: "corrente" | "poupanca"; // só uma destas 2 opções
  saldo: number;
  limiteCredito: number;
  creditoDisponivel: number;
}

export interface Agencia {
  codigo: number;
  nome: string;
  id: string;
  endereco: string;
}