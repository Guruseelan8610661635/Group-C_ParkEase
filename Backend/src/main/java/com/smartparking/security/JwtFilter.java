package com.smartparking.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String path = request.getRequestURI();

        // Skip JWT for public endpoints
        if ((path.startsWith("/api/auth/login") || path.startsWith("/api/auth/register") || path.startsWith("/api/map"))) {
            filterChain.doFilter(request, response);
            return;
        }

        String header = request.getHeader("Authorization");

        // No token → continue (Spring Security will handle unauthenticated requests)
        if (header == null || !header.startsWith("Bearer ")) {
            System.out.println("No Authorization header for: " + path);
            filterChain.doFilter(request, response);
            return;
        }

        try {
            String token = header.substring(7);

            if (!jwtUtil.validateToken(token)) {
                // Invalid token - let it pass to Spring Security
                System.out.println("Invalid token for: " + path);
                filterChain.doFilter(request, response);
                return;
            }

            String email = jwtUtil.extractUsername(token);
            String role = jwtUtil.extractRole(token);

            System.out.println("Valid JWT - User: " + email + ", Role: " + role);
            System.out.println("Authorities: " + jwtUtil.getAuthorities(role));

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            email,
                            null,
                            jwtUtil.getAuthorities(role)
                    );

            authentication.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request)
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

        } catch (Exception e) {
            // Log the error but continue - let Spring Security handle it
            System.err.println("JWT Filter Error: " + e.getMessage());
            e.printStackTrace();
        }

        filterChain.doFilter(request, response);
    }
}
