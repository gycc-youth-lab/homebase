import dynamic from 'next/dynamic';
import { JSX } from 'react';

/**
 * usage: src/app/components/MyComponent.tsx
 * 
 * 'use client'
 * 
 * import ClientWrapper from 'components/ClientWrapper';
 * 
 * const MyComponent = () => (
 *  <ClientWrapper>
 *      <div>My Component</div>
 *  </ClientWrapper>;)
 * 
 * export default MyComponent;
 */

type ClientWrapperProps = { children: JSX.Element };
const ClientWrapper = (props: ClientWrapperProps) => {
    const { children } = props;

    return children;
};

export default dynamic(() => Promise.resolve(ClientWrapper), {
    ssr: false,
});
