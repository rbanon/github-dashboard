<template>
  <div class="repo-table-container">
    <table class="repo-table">
      <thead>
        <tr class="table-header">
          <th class="th-name">{{ $t('repos.details.name') }}</th>
          <th class="th-language">{{ $t('repos.details.language') }}</th>
          <th class="th-stars">{{ $t('repos.stars') }}</th>
          <th class="th-forks">{{ $t('repos.forks') }}</th>
          <th class="th-updated">{{ $t('repos.updated') }}</th>
          <th class="th-action">{{ $t('repos.details.action') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="repo in repos"
          :key="repo.id"
          class="table-row"
          @click="handleRowClick(repo)"
        >
          <td class="td-name">
            <div class="repo-cell-content">
              <span v-if="repo.fork" class="fork-badge-small">F</span>
              <span class="repo-name-text">{{ repo.name }}</span>
            </div>
          </td>
          <td class="td-language">
            <span v-if="repo.language" class="language-badge">
              <span class="language-dot"></span>
              {{ repo.language }}
            </span>
            <span v-else class="text-muted">—</span>
          </td>
          <td class="td-stars">
            <span class="metric-badge stars">⭐ {{ repo.stargazers_count }}</span>
          </td>
          <td class="td-forks">
            <span class="metric-badge forks">🍴 {{ repo.forks_count }}</span>
          </td>
          <td class="td-updated">
            <span class="date-cell">{{ formatDate(repo.updated_at) }}</span>
          </td>
          <td class="td-action">
            <a
              :href="repo.html_url"
              target="_blank"
              class="action-link"
              @click.stop
              :title="$t('repos.details.viewOnGithub')"
            >
              🔗
            </a>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="repos.length === 0" class="table-empty">
      <p>{{ $t('repos.noRepos') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRepoDetails } from '../composables/useRepoDetails'
import type { GithubRepo } from '../types/github'

const props = defineProps<{
  repos: GithubRepo[]
}>()

const { openDetails } = useRepoDetails()

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

function handleRowClick(repo: GithubRepo): void {
  openDetails(repo)
}
</script>

<style lang="scss" scoped>
.repo-table-container {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.repo-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;

  thead {
    background-color: var(--bg-tertiary);
    border-bottom: 2px solid var(--border-color);
  }

  tbody {
    tr {
      border-bottom: 1px solid var(--border-color);
      transition: all 0.2s ease;
      cursor: pointer;

      &:hover {
        background-color: var(--bg-tertiary);

        .action-link {
          opacity: 1;
        }
      }

      &:last-child {
        border-bottom: none;
      }
    }
  }
}

.table-header {
  text-align: left;
  font-weight: 600;
  color: var(--text-primary);
}

th {
  padding: 1rem;
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

td {
  padding: 1rem;
  color: var(--text-primary);
  vertical-align: middle;
}

.th-name {
  width: 35%;
  text-align: left;
}

.th-language {
  width: 15%;
}

.th-stars {
  width: 12%;
  text-align: center;
}

.th-forks {
  width: 12%;
  text-align: center;
}

.th-updated {
  width: 15%;
  text-align: right;
}

.th-action {
  width: 8%;
  text-align: center;
}

.td-name {
  font-weight: 500;
  max-width: 300px;
}

.repo-cell-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.fork-badge-small {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: var(--accent);
  color: white;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  flex-shrink: 0;
}

.repo-name-text {
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
}

.td-language {
  text-align: left;
}

.language-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background-color: var(--bg-primary);
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.language-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--accent);
}

.text-muted {
  color: var(--text-secondary);
  opacity: 0.6;
}

.td-stars,
.td-forks {
  text-align: center;
}

.metric-badge {
  display: inline-block;
  padding: 0.4rem 0.8rem;
  background-color: var(--bg-primary);
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 500;
  white-space: nowrap;

  &.stars {
    color: #fbbf24;
  }

  &.forks {
    color: var(--accent);
  }
}

.td-updated {
  text-align: right;
}

.date-cell {
  color: var(--text-secondary);
  font-size: 0.85rem;
  white-space: nowrap;
}

.td-action {
  text-align: center;
}

.action-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: var(--accent);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 1rem;
  opacity: 0.7;
  transition: all 0.2s ease;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
}

.table-empty {
  padding: 3rem 1rem;
  text-align: center;
  color: var(--text-secondary);

  p {
    margin: 0;
  }
}

// Responsive
@media (max-width: 1024px) {
  .th-name,
  .td-name {
    width: 30%;
  }

  .th-stars,
  .th-forks,
  .td-stars,
  .td-forks {
    width: 10%;
  }
}

@media (max-width: 768px) {
  th,
  td {
    padding: 0.75rem 0.5rem;
  }

  .th-name,
  .td-name {
    width: 40%;
  }

  .th-language,
  .td-language {
    display: none;
  }

  .th-updated,
  .td-updated {
    display: none;
  }

  .th-stars,
  .th-forks,
  .td-stars,
  .td-forks {
    width: 15%;
    font-size: 0.8rem;
  }

  .metric-badge {
    padding: 0.3rem 0.4rem;
    font-size: 0.7rem;
  }
}
</style>
