import { CssBaseline } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import * as React from "react";
import { Suspense } from "react";

// A theme with custom primary and secondary color.
// It's optional.
export const theme = createMuiTheme({
	palette: {
		primary: {
			light: "#e5e5e5",
			main: "#727272",
			dark: "#363839",
			contrastText: "#fff",
		},
		secondary: {
			light: "#ff5e50",
			main: "#e41e26",
			dark: "#a90000",
			contrastText: "#fff",
		},
	},
});

function withRoot(Component: any) {
	function WithRoot(props: object) {
		// MuiThemeProvider makes the theme available down the React tree
		// thanks to React context.
		return (
			<Suspense fallback={<div>Loading...</div>}>
				<ThemeProvider theme={theme}>
					{/* Reboot kickstart an elegant, consistent, and simple baseline to build upon. */}
					<CssBaseline />
					<Component {...props} />
				</ThemeProvider>
			</Suspense>
		);
	}

	return WithRoot;
}

export default withRoot;
