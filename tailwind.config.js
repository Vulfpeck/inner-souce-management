module.exports = {
    purge: {
        content: ['./src/**/*.html','./src/**/*.js'],
      },
    theme: {
        extend: {
            fontFamily: {
                sans: [
                    "\"Source Sans Pro\"",
                    "system-ui",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    "\"Segoe UI\"",
                    "Roboto",
                    "\"Helvetica Neue\"",
                    "Arial",
                    "\"Noto Sans\"",
                    "sans-serif",
                    "\"Apple Color Emoji\"",
                    "\"Segoe UI Emoji\"",
                    "\"Segoe UI Symbol\"",
                    "\"Noto Color Emoji\""
                ]
            },
            spacing: {
                "72": "18rem",
                "84": "21rem",
                "96": "24rem",
            },
            colors: {
                "nebula-grey-100": "#FCFCFC",
                "nebula-grey-200": "#F6F6F6",
                "nebula-grey-300": "#F1F1F1",
                "nebula-grey-400": "#E2E2E2",
                "nebula-grey-500": "#B3B3B3",
                "nebula-grey-600": "#7E7E7E",
                "nebula-grey-700": "#464646",
                "nebula-grey-800": "#191919",
                "nebula-grey-900": "#111111",
                "nebula-blue": "#0066FF",
                "nebula-blue-light": "#DCEAFF",
                "nebula-red": "#FF6363",
                "nebula-red-light": "#FFF8F8",
                "nebula-purple": "#9837E4",
                "nebula-purple-light": "#F4E5FF",
                "nebula-green": "#009974",
                "nebula-green-light": "#E3F5F1",
                "nebula-yellow": "#A38418",
                "nebula-yellow-light": "#FFF7D9",
            },
        },
    },
    variants: {
        borderColor: ["responsive", "hover", "focus", "active"],
        textColor: ["hover", "active"]
    },
    plugins: [],
};
