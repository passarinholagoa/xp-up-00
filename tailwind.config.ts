
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Gaming themed colors
				quest: {
					primary: '#8B5CF6',
					secondary: '#A855F7',
					accent: '#C084FC',
					legendary: '#FBBF24',
					epic: '#8B5CF6',
					rare: '#06B6D4',
					common: '#6B7280'
				},
				hp: {
					high: '#10B981',
					medium: '#F59E0B',
					low: '#EF4444',
					critical: '#DC2626'
				},
				xp: {
					bar: '#3B82F6',
					glow: '#60A5FA'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			transitionDuration: {
				'250': '250ms',
				'400': '400ms',
				'600': '600ms',
				'700': '700ms'
			},
			transitionTimingFunction: {
				'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
				'smooth-out': 'cubic-bezier(0.4, 0, 1, 1)',
				'bounce-soft': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0',
						opacity: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)',
						opacity: '1'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)',
						opacity: '1'	
					},
					to: {
						height: '0',
						opacity: '0'
					}
				},
				'pulse-glow': {
					'0%, 100%': {
						boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)'
					},
					'50%': {
						boxShadow: '0 0 30px rgba(139, 92, 246, 0.6)'
					}
				},
				'level-up': {
					'0%': {
						transform: 'scale(1)',
						opacity: '1'
					},
					'50%': {
						transform: 'scale(1.05)',
						opacity: '0.9'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'color-change': {
					'0%': {
						color: '#FBBF24'
					},
					'20%': {
						color: '#8B5CF6'
					},
					'40%': {
						color: '#06B6D4'
					},
					'60%': {
						color: '#10B981'
					},
					'80%': {
						color: '#EF4444'
					},
					'100%': {
						color: '#FBBF24'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-out': {
					'0%': {
						opacity: '1',
						transform: 'translateY(0)'
					},
					'100%': {
						opacity: '0',
						transform: 'translateY(-10px)'
					}
				},
				'slide-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-down': {
					'0%': {
						opacity: '1',
						transform: 'translateY(0)'
					},
					'100%': {
						opacity: '0',
						transform: 'translateY(20px)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
				'accordion-up': 'accordion-up 0.25s cubic-bezier(0.4, 0, 1, 1)',
				'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
				'level-up': 'level-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
				'fade-in': 'fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
				'fade-out': 'fade-out 0.3s cubic-bezier(0.4, 0, 1, 1)',
				'slide-up': 'slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
				'slide-down': 'slide-down 0.3s cubic-bezier(0.4, 0, 1, 1)'
			},
			backgroundImage: {
				'quest-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
				'hp-gradient': 'linear-gradient(90deg, #10B981 0%, #059669 100%)',
				'xp-gradient': 'linear-gradient(90deg, #3B82F6 0%, #1D4ED8 100%)',
				'legendary-gradient': 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
