// material-ui
import { alpha, createTheme } from '@mui/material/styles';

// third-party
import { presetDarkPalettes, presetPalettes, PalettesProps } from '@ant-design/colors';

// project import
import ThemeOption from './theme';

// types
import { PaletteThemeProps } from 'types/theme';
import { PresetColor, ThemeMode } from 'types/config';

// ==============================|| DEFAULT THEME - PALETTE  ||============================== //

const Palette = (mode: ThemeMode, presetColor: PresetColor) => {
  const colors: PalettesProps = mode === ThemeMode.DARK ? presetDarkPalettes : presetPalettes;

  let greyPrimary = [
    '#ffffff',
    '#fafafa',
    '#f5f5f5',
    '#f0f0f0',
    '#d9d9d9',
    '#bfbfbf',
    '#8c8c8c',
    '#595959',
    '#262626',
    '#141414',
    '#000000'
  ];
  let greyAscent = ['#fafafa', '#bfbfbf', '#434343', '#1f1f1f'];
  let greyConstant = ['#fafafb', '#e6ebf1'];

  if (mode === ThemeMode.DARK) {
    greyPrimary = ['#000000', '#141414', '#1e1e1e', '#595959', '#8c8c8c', '#bfbfbf', '#d9d9d9', '#f0f0f0', '#f5f5f5', '#fafafa', '#ffffff'];
    // greyPrimary.reverse();
    greyAscent = ['#fafafa', '#bfbfbf', '#434343', '#1f1f1f'];
    greyConstant = ['#121212', '#d3d8db'];
  }
  colors.grey = [...greyPrimary, ...greyAscent, ...greyConstant];

  const paletteColor: PaletteThemeProps = ThemeOption(colors, presetColor, mode);

  return createTheme({
    palette: {
      mode,
      common: {
        black: '#000',
        white: '#fff'
      },
      ...paletteColor,
      primary: {
        main: '#83F1AA'
      },
      text: {
        primary: '#ffffff',
        secondary: '#ffffff90',
        disabled: '#ffffff50'
      },
      action: {
        disabled: paletteColor.grey[300]
      },
      warning: {
        main: '#faad14'
      },
      divider: mode === ThemeMode.DARK ? alpha(paletteColor.grey[900]!, 0.05) : paletteColor.grey[200],
      background: {
        paper: '#141718',
        default: '#141718'
      }
    }
  });
};

export default Palette;
