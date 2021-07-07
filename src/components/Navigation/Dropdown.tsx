import React, { useCallback } from 'react';
import classNames from 'classnames';
import { dropdownMounted, dropdownUnmounted } from '../../dropdownListener';
import { Icon, IconName } from '@blueprintjs/core';
import './Dropdown.scss';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

interface Props {
  icon?: IconName;
}

export const Dropdown = React.memo(({
  children,
  icon,
}: React.PropsWithChildren<Props>) => {

  const [open, setOpen] = useState<boolean | null>(null);
  const dropdownElement = useRef<HTMLDivElement>(null);

  const toggleClasses = classNames({
    'nav-dropdown-toggle': true,
    'unselectable': true,
    'loaded': open === null,
    'open': open === true,
    'closed': open === false,
  });

  const listClasses = classNames({
    'dropdown-list': true,
    'loaded': open === null,
    'open': open === true,
    'closed': open === false,
  });

  const handleClose = useCallback((source: HTMLDivElement) => {
    if (open === true && source !== dropdownElement.current && dropdownElement.current != null) {
      setOpen(false);
    }
  }, [open, dropdownElement, setOpen]);

  const handleClickToggle = useCallback((e: React.MouseEvent) => {
    setOpen(!open);
  }, [open, setOpen]);

  useEffect(() => {
    dropdownMounted(handleClose);
    return () => dropdownUnmounted(handleClose);
  }, [handleClose]);

  return (
    <div className='kai-dropdown'>
      <div ref={dropdownElement} className={toggleClasses} onClick={handleClickToggle}>
        {icon && <Icon icon={icon} iconSize={32} />}
        <Icon icon={open ? 'caret-up' : 'caret-down'} iconSize={20} />
      </div>
      <div className={listClasses}>
        {React.Children.map(children, (child) => child)}
      </div>
    </div>
  );
})
