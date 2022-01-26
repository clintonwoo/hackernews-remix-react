export interface IBlankLayoutProps {
  children: React.ReactNode;
}

export function BlankLayout(props: IBlankLayoutProps): JSX.Element {
  const { children } = props;

  return <div className="WordSection1">{children}</div>;
}
