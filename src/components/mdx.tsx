import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import React, { ReactNode } from "react";
import {
  Heading, Text, InlineCode, CodeBlock, TextProps, MediaProps, Accordion,
  AccordionGroup, Table, Feedback, Button, Card, Grid, Row, Column, Icon,
  Media, SmartLink, List, ListItem, Line,
} from "@once-ui-system/core";

type CustomLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: ReactNode; };
function CustomLink({ href, children, ...props }: CustomLinkProps) {
  if (href.startsWith("/")) { return ( <SmartLink href={href} {...props}>{children}</SmartLink> ); }
  if (href.startsWith("#")) { return ( <a href={href} {...props}>{children}</a> ); }
  return ( <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a> );
}

function createImage({ alt, src, ...props }: MediaProps & { src: string }) {
  if (!src) { console.error("Media requires a valid 'src' property."); return null; }
  return ( <Media marginTop="8" marginBottom="16" enlarge radius="m" border="neutral-alpha-medium" sizes="(max-width: 960px) 100vw, 960px" alt={alt} src={src} {...props} /> );
}

function createParagraph({ children }: TextProps) {
  return ( <Text style={{ lineHeight: "175%", textAlign: 'justify' }} variant="body-default-m" onBackground="neutral-medium" marginTop="8" marginBottom="12">{children}</Text> );
}

function createInlineCode({ children }: { children: ReactNode }) { return <InlineCode>{children}</InlineCode>; }

function createCodeBlock(props: any) {
  if (props.children && props.children.props && props.children.props.className) {
    const { className, children } = props.children.props;
    const language = className.replace("language-", "");
    const label = language.charAt(0).toUpperCase() + language.slice(1);
    return ( <CodeBlock marginTop="8" marginBottom="16" codes={[{ code: children, language, label }]} copyButton={true} /> );
  }
  return <pre {...props} />;
}

function createList({ children }: { children: ReactNode }) { return <List>{children}</List>; }

function createListItem({ children }: { children: ReactNode }) {
  return ( <ListItem marginTop="4" marginBottom="8" style={{ lineHeight: "175%" }}>{children}</ListItem> );
}

function createHR() { return ( <Row fillWidth horizontal="center"><Line maxWidth="40" /></Row> ); }

export const serverComponents = {
  p: createParagraph as any,
  img: createImage as any,
  a: CustomLink as any,
  code: createInlineCode as any,
  pre: createCodeBlock as any,
  ol: createList as any,
  ul: createList as any,
  li: createListItem as any,
  hr: createHR as any,
  Heading, Text, CodeBlock, InlineCode, Accordion, AccordionGroup, Table, Feedback,
  Button, Card, Grid, Row, Column, Icon, Media, SmartLink,
};

type CustomMDXProps = MDXRemoteProps & {
  components?: any;
};

export function CustomMDX(props: CustomMDXProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...serverComponents, ...(props.components || {}) }}
    />
  );
}