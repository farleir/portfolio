
// Um renderizador de Markdown muito simples e seguro para evitar XSS.
// Para um blog mais complexo, considere usar uma biblioteca como `react-markdown`.
export default function MarkdownRenderer({ content }: { content: string }) {
    const elements = content.trim().split('\n').map((line, index) => {
        if (line.startsWith('## ')) {
            return <h2 key={index}>{line.substring(3)}</h2>;
        }
        if (line.startsWith('### ')) {
            return <h3 key={index}>{line.substring(4)}</h3>;
        }
        if (line.startsWith('- ')) {
            return <li key={index}>{line.substring(2)}</li>;
        }
        if (line.trim() === '') {
            return null;
        }
        return <p key={index}>{line}</p>;
    }).filter(Boolean);

    return <>{elements}</>;
};
