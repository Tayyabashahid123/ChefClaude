
import ReactMarkdown from 'react-markdown';

export default function ClaudeRecipe(props) {
    if (!props.recipe || typeof props.recipe !== 'string') {
        return null;
    }

    return (
        <section>
            <div className="suggested-recipe-container" aria-live="polite">
                <h2>Chef Claude Recommends:</h2>
                <ReactMarkdown>{props.recipe}</ReactMarkdown>
            </div>
        </section>
    );
}
