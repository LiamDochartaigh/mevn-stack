import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import colors from 'vuetify/util/colors';
import { fa } from 'vuetify/iconsets/fa';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';
import '@fortawesome/fontawesome-free/css/all.css';


const vuetify = createVuetify({
    components,
    directives,
    icons:{
        defaultSet: 'mdi',
        aliases: {
            ...aliases
        },
        sets: {
            mdi,
            fa
        }
    },
    theme: {
        defaultTheme: 'dark',
        themes: {
            light: {
                colors:{
                    primary: "#2CB4D3",
                    secondary: colors.red.lighten4,
                    accent: colors.indigo.base,
                }
            },
            dark: {
                colors:{
                    bgMain: "#0f0f0f",
                    bgSecondary: "#181717",
                    bgLighten: "#242222",
                    primary: "#2CB4D3",
                }
            }
        },
    },
})

export default vuetify;