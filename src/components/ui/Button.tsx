import React from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

// Common props shared between button and link variants
interface CommonButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
}

// Props for when the component is a standard HTML button
type HtmlButtonProps = CommonButtonProps & 
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonButtonProps | 'as'> & {
  as?: 'button' | undefined; // Explicitly 'button' or undefined
};

// Props for when the component is a React Router Link
type RouterLinkButtonProps = CommonButtonProps & 
  Omit<RouterLinkProps, keyof CommonButtonProps | 'as'> & {
  as: typeof RouterLink; // Must be RouterLink
  // 'to' prop is inherited from RouterLinkProps
};

// The final ButtonProps is a union of the two types
export type ButtonProps = HtmlButtonProps | RouterLinkButtonProps;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  fullWidth = false,
  children,
  className = '',
  as: Component = 'button', // Default to 'button'
  ...props // Contains other props like 'to', 'type', 'onClick', 'disabled'
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500',
    outline: 'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';

  // Determine disabled state:
  // isLoading always disables.
  // If it's a button, props.disabled is also considered.
  // For Link, 'disabled' is not a standard prop, so we rely on isLoading and visual cues.
  const isDisabled = isLoading || (Component === 'button' && (props as React.ButtonHTMLAttributes<HTMLButtonElement>).disabled);
  const disabledClass = isDisabled ? 'opacity-50 cursor-not-allowed' : '';

  const combinedClassName = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClass} ${className}`;

  const componentProps: any = {
    className: combinedClassName,
    ...props, // Pass all other props
  };

  // Only add 'disabled' attribute if it's a true button and is disabled
  if (Component === 'button') {
    componentProps.disabled = isDisabled;
  }

  return (
    <Component {...componentProps}>
      {isLoading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
      {!isLoading && icon && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
    </Component>
  );
};