import React from 'react'

export default function FormatDate( createdAt) {
    const date = new Date(createdAt);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getUTCFullYear();
    return `${day} ${month}, ${year}`;
}
