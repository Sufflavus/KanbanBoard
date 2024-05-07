import * as React from 'react';
import { useTranslation } from "react-i18next";
import dayjs from 'dayjs';
import { Language, SupportedLanguages } from '../../models';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { blue } from '@mui/material/colors';
import './LanguageSelector.less';

const LanguageSelector = () => {
    const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(menuAnchorEl);

    const [t, i18n] = useTranslation('common');
    const selectedLanguage = i18n.language;

    console.log(selectedLanguage)

    const onMenuButtonClick = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const onMenuClose = () => {
        setMenuAnchorEl(null);
    };

    const onLanguageSelected = (language: Language) => {
        // todo: Existing dates are not updated. Find a better way to store and update locale info
        i18n.changeLanguage(language.key);
        dayjs.locale(language.key);
        onMenuClose();
    };

    return (
        <div className="language-selector">
            <Button
                id="language-selector-button"
                aria-controls={isMenuOpen ? 'language-selector-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isMenuOpen ? 'true' : undefined}
                disableElevation
                size="small"
                endIcon={<ArrowDropDownIcon />}
                onClick={onMenuButtonClick}
            >
                {selectedLanguage}
            </Button>
            <Menu
                id="menu"
                MenuListProps={{
                    'aria-labelledby': 'language-selector-button',
                    sx: {
                        "&& .Mui-selected": {
                          backgroundColor: blue[50]
                        }
                      }
                }}
                anchorEl={menuAnchorEl}
                open={isMenuOpen}
                onClose={onMenuClose}
            >
                {
                    SupportedLanguages.map((language: Language) =>
                        <MenuItem 
                            key={language.key}
                            selected={language.key === selectedLanguage}
                            onClick={onLanguageSelected.bind(this, language)}
                        >
                            {t(`language-selector.languages.${language.key}`)}
                        </MenuItem>
                    )
                }
            </Menu>
        </div>
    );
};

export default LanguageSelector;