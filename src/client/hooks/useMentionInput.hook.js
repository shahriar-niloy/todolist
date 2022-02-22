import { useEffect, useState } from "react";

export default function useMentionInput(schema) {
    const [value, setValue] = useState('');
    const [mentions, setMentions] = useState([]);
    const [mentionInputError, setMentionInputError] = useState('');
    const [mentionInputTouched, setMentionInputTouched] = useState(false);

    const handleMentionInputChange = (value, mentions) => {
        setValue(value);
        setMentions(mentions);
    };

    const handleMentionInputSubmit = () => {
        setValue('');
        setMentions([]);
        setMentionInputTouched(false);
    };

    const handleMentionInputBlur = () => setMentionInputTouched(true);

    useEffect(async () => {
        if (schema) {
            await schema.validate(value)
                .then(() => setMentionInputError(''))
                .catch(err => setMentionInputError(err?.message || ''));
        }
    }, [value, schema]);

    return {
        value,
        mentions,
        mentionInputError,
        mentionInputTouched,
        handleMentionInputChange,
        handleMentionInputSubmit,
        handleMentionInputBlur
    };
}