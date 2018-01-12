package es.keensoft.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(es.keensoft.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(es.keensoft.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(es.keensoft.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(es.keensoft.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(es.keensoft.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(es.keensoft.domain.School.class.getName(), jcacheConfiguration);
            cm.createCache(es.keensoft.domain.School.class.getName() + ".teachers", jcacheConfiguration);
            cm.createCache(es.keensoft.domain.Teacher.class.getName(), jcacheConfiguration);
            cm.createCache(es.keensoft.domain.Teacher.class.getName() + ".classrooms", jcacheConfiguration);
            cm.createCache(es.keensoft.domain.Classroom.class.getName(), jcacheConfiguration);
            cm.createCache(es.keensoft.domain.Classroom.class.getName() + ".students", jcacheConfiguration);
            cm.createCache(es.keensoft.domain.Review.class.getName(), jcacheConfiguration);
            cm.createCache(es.keensoft.domain.Student.class.getName(), jcacheConfiguration);
            cm.createCache(es.keensoft.domain.Student.class.getName() + ".students", jcacheConfiguration);
            cm.createCache(es.keensoft.domain.Student.class.getName() + ".reviews", jcacheConfiguration);
            cm.createCache(es.keensoft.domain.Student.class.getName() + ".classrooms", jcacheConfiguration);
            cm.createCache(es.keensoft.domain.Category.class.getName(), jcacheConfiguration);
            cm.createCache(es.keensoft.domain.Category.class.getName() + ".books", jcacheConfiguration);
            cm.createCache(es.keensoft.domain.Filter.class.getName(), jcacheConfiguration);
            cm.createCache(es.keensoft.domain.Filter.class.getName() + ".books", jcacheConfiguration);
            cm.createCache(es.keensoft.domain.Book.class.getName(), jcacheConfiguration);
            cm.createCache(es.keensoft.domain.Book.class.getName() + ".reviews", jcacheConfiguration);
            cm.createCache(es.keensoft.domain.Book.class.getName() + ".filters", jcacheConfiguration);
            cm.createCache(es.keensoft.domain.TimelineEvent.class.getName(), jcacheConfiguration);
            cm.createCache(es.keensoft.domain.TimelineEvent.class.getName() + ".reviews", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
