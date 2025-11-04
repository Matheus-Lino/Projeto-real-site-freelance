// Função para normalizar strings removendo acentos e convertendo para minúsculas
export function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// Função para calcular a distância de Levenshtein entre duas strings
export function levenshteinDistance(str1: string, str2: string): number {
  const len1 = str1.length;
  const len2 = str2.length;
  const matrix: number[][] = [];

  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[len1][len2];
}

// Função para verificar se uma string contém outra com tolerância a erros
export function fuzzyMatch(searchTerm: string, targetText: string, threshold: number = 2): boolean {
  const normalizedSearch = normalizeString(searchTerm);
  const normalizedTarget = normalizeString(targetText);

  // Verifica match exato
  if (normalizedTarget.includes(normalizedSearch)) {
    return true;
  }

  // Verifica match fuzzy por palavras
  const searchWords = normalizedSearch.split(" ").filter(w => w.length > 0);
  const targetWords = normalizedTarget.split(" ").filter(w => w.length > 0);

  for (const searchWord of searchWords) {
    let found = false;
    for (const targetWord of targetWords) {
      // Para palavras curtas, precisa de match mais preciso
      const maxDistance = searchWord.length <= 3 ? 1 : threshold;
      const distance = levenshteinDistance(searchWord, targetWord);
      
      if (distance <= maxDistance) {
        found = true;
        break;
      }
    }
    if (!found) {
      return false;
    }
  }

  return searchWords.length > 0;
}
