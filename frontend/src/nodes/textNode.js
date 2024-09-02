import React, { useState, useEffect, useCallback } from 'react';
import BaseNode from './baseNode';
import { Handle, Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '');
  const [handles, setHandles] = useState([]);

  const handleResize = useCallback((event) => {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, []);

  const handleTextChange = (event) => {
    const value = event.target.value;
    setText(value);

    // Extract variables within {{ }}
    const regex = /\{\{\s*(\w+)\s*\}\}/g;
    const newHandles = [];
    let match;

    while ((match = regex.exec(value)) !== null) {
      newHandles.push({
        type: 'target',
        position: Position.Left,
        id: `${id}-${match[1]}`,
      });
    }

    setHandles(newHandles);
  };

  // Resize the textarea on mount and whenever the text changes
  useEffect(() => {
    const textarea = document.getElementById(`textarea-${id}`);
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [text, id]);

  return (
    <BaseNode
      id={id}
      data={{ ...data, text }}
      label="Text"
      type="text"
      handles={handles}
    >
      <textarea
        id={`textarea-${id}`}
        value={text}
        onChange={handleTextChange}
        onInput={handleResize}
        style={{
          width: '100%',
          height: 'auto',
          resize: 'none',
          overflow: 'hidden',
        }}
      />
    </BaseNode>
  );
};

export default TextNode;
