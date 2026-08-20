import { Link as RouterLink, type LinkProps } from "react-router-dom";

type AppLinkProps = Omit<LinkProps, "to"> & {
  href: string;
};

/** Drop-in `href` prop shim for react-router `Link`. */
export function Link({ href, ...props }: AppLinkProps) {
  return <RouterLink to={href} {...props} />;
}
