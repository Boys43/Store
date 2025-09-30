import { botbleAPI } from './api'

export interface User {
  id: number
  name: string
  email: string
  phone?: string
  avatar?: string
  created_at: string
  updated_at: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  password_confirmation: string
  first_name?: string
  last_name?: string
  phone?: string
}

export interface AuthResponse {
  success: boolean
  message: string
  user?: User
  token?: string
  errors?: any
}

class AuthService {
  private static instance: AuthService
  private user: User | null = null
  private token: string | null = null

  private constructor() {
    // Initialize token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token')
    }
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  // Get current user (simplified for demo)
  async getCurrentUser(): Promise<User | null> {
    try {
      // Return a demo user for now
      return {
        id: 1,
        name: 'Guest User',
        email: 'guest@example.com',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    } catch (error) {
      console.error('Error fetching current user:', error)
      return null
    }
  }

  // Login user
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await botbleAPI.login(credentials.email, credentials.password)
      
      if (response.success && response.data?.token) {
        this.token = response.data.token
        this.user = response.data.user || null
        
        // Store token securely
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_token', response.data.token)
        }
        
        return {
          success: true,
          message: 'Login successful',
          user: this.user || undefined,
          token: this.token || undefined
        }
      } else {
        return {
          success: false,
          message: response.message || 'Login failed'
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      return {
        success: false,
        message: 'An error occurred during login'
      }
    }
  }

  // Register user
  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await botbleAPI.register(userData)
      
      if (response.success) {
        // Registration successful but no token returned (email verification required)
        return {
          success: true,
          message: response.message || 'Registration successful! Please check your email to verify your account.'
        }
      } else {
        return {
          success: false,
          message: response.message || 'Registration failed',
          errors: response.errors
        }
      }
    } catch (error) {
      console.error('Registration error:', error)
      return {
        success: false,
        message: 'An error occurred during registration'
      }
    }
  }

  // Logout user
  async logout(): Promise<AuthResponse> {
    try {
      await botbleAPI.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      this.token = null
      this.user = null
      
      // Remove token from storage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token')
      }
    }
    
    return {
      success: true,
      message: 'Logout successful'
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.token
  }

  // Get current token
  getToken(): string | null {
    return this.token
  }

  // Get current user
  getUser(): User | null {
    return this.user
  }

  // Update user data
  updateUser(user: User): void {
    this.user = user
  }

  // Refresh token (if needed)
  async refreshToken(): Promise<boolean> {
    try {
      // Implement token refresh logic here if needed
      const user = await this.getCurrentUser()
      return !!user
    } catch (error) {
      console.error('Token refresh error:', error)
      this.logout()
      return false
    }
  }
}

export const authService = AuthService.getInstance() 