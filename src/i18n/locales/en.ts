export default {
  common: {
    close: 'Close',
    copy: 'Copy',
    copied: 'Copied!'
  },
  header: {
    title: 'GitHub Dashboard',
    subtitle: 'Explore any GitHub profile'
  },
  search: {
    placeholder: 'Enter a GitHub username...',
    button: 'Search',
    error: 'User not found. Please check the username and try again.'
  },
  profile: {
    title: 'Profile',
    followers: 'Followers',
    following: 'Following',
    repos: 'Public Repos',
    joined: 'Joined',
    noLocation: 'No location provided',
    noBio: 'No bio available',
    viewProfile: 'View on GitHub',
    share: 'Share',
    shareSuccess: 'Profile link copied to clipboard!',
    shareError: 'Failed to copy link',
    viewMode: {
      simple: 'Simple',
      complete: 'Complete'
    }
  },
  repos: {
    title: 'Top Repositories',
    stars: 'Stars',
    forks: 'Forks',
    fork: 'Fork',
    noDescription: 'No description available',
    noRepos: 'No public repositories found',
    updated: 'Updated',
    export: 'Export to CSV',
    filters: {
      title: 'Advanced Search',
      language: 'Language',
      allLanguages: 'All Languages',
      minStars: 'Minimum Stars',
      maxStars: 'Maximum Stars',
      sortBy: 'Sort By',
      sortStars: 'Stars',
      sortForks: 'Forks',
      sortUpdated: 'Last Updated',
      sortName: 'Name',
      sortOrder: 'Sort Order',
      ascending: 'Ascending',
      descending: 'Descending',
      active: 'Active filters',
      reset: 'Reset'
    },
    details: {
      description: 'Description',
      metrics: 'Metrics',
      language: 'Language',
      status: 'Status',
      active: 'Active',
      maintenance: 'Maintenance',
      archived: 'Archived',
      dates: 'Dates',
      created: 'Created',
      lastUpdate: 'Last Updated',
      forkInfo: 'Fork Information',
      isForked: 'This is a fork of',
      links: 'Links',
      viewOnGithub: 'View on GitHub',
      homepage: 'Homepage',
      name: 'Name',
      action: 'Action'
    },
    viewMode: {
      simple: 'Grid',
      detailed: 'Table'
    }
  },
  languages: {
    title: 'Most Used Languages'
  },
  activity: {
    title: 'Recent Activity',
    noActivity: 'No recent public activity'
  },
  theme: {
    dark: 'Dark mode',
    light: 'Light mode'
  },
  status: {
    loading: 'Loading profile data...',
    searchPrompt: '🔍 Enter a GitHub username to get started'
  },
  searchHistory: {
    title: 'Recent Searches',
    clearButton: 'Clear',
    clearConfirmTitle: 'Clear Search History',
    clearConfirmMessage: 'Are you sure you want to clear all your recent searches? This action cannot be undone.',
    keepButton: 'Keep History',
    clearAllButton: 'Clear All'
  },
  rateLimit: {
    title: 'API Rate Limit',
    remaining: 'requests remaining',
    warning: '⚠️ Running low on API requests',
    resetsAt: 'Resets at'
  },
  errors: {
    userNotFound: 'User not found',
    networkError: 'Network error. Please check your connection.',
    rateLimitExceeded: 'Rate limit exceeded. Please try again later.',
    unknownError: 'An unexpected error occurred.'
  }
}