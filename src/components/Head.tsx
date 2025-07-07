/**
 * @copyright 2025 codingczar
 * @license Apache-2.0
 * @description Head component for the app
 */

/**
 * Node modules
 */
import React from 'react';
import { Helmet } from 'react-helmet';

/**
 * Types
 */
type HeadProps = {
    title:string;
}

const Head: React.FC<HeadProps> = ({title}) => {
    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    )
}

export default Head