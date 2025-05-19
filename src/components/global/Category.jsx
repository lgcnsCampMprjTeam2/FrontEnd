import React from 'react';

export default function Category({
    value,
    onChange,
    options = [
        '전체',
        '자료구조',
        '알고리즘',
        '네트워크',
        '운영체제',
        '데이터베이스',
        '소프트웨어 공학',
    ],
    className = '',
    ...rest
}) {
    return (
        <>

            <select
                value={value}
                onChange={onChange}
                className={
                    'h-30 w-150 text-lg px-4 border border--color-gray-300 rounded-lg ' +
                    'focus:ring-2 focus:ring-blue-400 focus:outline-none ' +
                    className
                }
                {...rest}
            >
                {options.map(opt => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </>
    );
}
