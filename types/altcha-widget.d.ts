export {};

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        "altcha-widget": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
          auto?: string;
          challenge?: string;
          language?: string;
          name?: string;
          type?: string;
        };
      }
    }
  }
}
