package el.itcompany.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // Disable CSRF for Postman testing
                .authorizeHttpRequests()
                .requestMatchers("/api/public/**").permitAll() // Allow all requests to /api/public
                .anyRequest().authenticated(); // Other requests require authentication
        return http.build();
    }
}