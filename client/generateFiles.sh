!/bin/bash

# ng g m features/discussion-board/ -m app
# mkdir src/app/features/discussion-board/components
# ng g c features/discussion-board/components/leaderboard-widget
# ng g c features/discussion-board/components/new-post-widget
# ng g c features/discussion-board/components/post-feed
# ng g c features/discussion-board/components/post-feed-item
# ng g m features/post-thread/ -m app
# mkdir src/app/features/post-thread/components
# ng g c features/post-thread/components/post-item
# ng g c features/post-thread/components/post-comments
# ng g c features/post-thread/components/post-comment-item
# ng g c features/post-thread/components/new-comment
# ng g m features/leaderboard/ -m app
# mkdir src/app/features/leaderboard/components
# ng g c features/leaderboard/components/post-leaderboard
# ng g c features/leaderboard/components/post-leaderboard-item
# ng g c features/leaderboard/components/user-leaderboard
# ng g c features/leaderboard/components/user-leaderboard-item
# ng g m features/settings/ -m app
# mkdir src/app/features/settings/components
# ng g c features/settings/components/account-settings
# ng g c features/settings/components/application-settings
# ng g m features/account/ -m app
# mkdir src/app/features/account/components
# ng g c features/account/components/login
# ng g c features/account/components/register
# ng g m features/admin/ -m app
# mkdir src/app/features/admin/components
# ng g c features/admin/components/reported-posts
# ng g c features/admin/components/reported-post-item
# ng g c features/admin/components/flagged-users
# ng g c features/admin/components/flagged-user-item


ng g c features/post-thread/post-thread --flat
ng g c features/leaderboard/leaderboard --flat
ng g c features/settings/settings --flat
ng g c features/account/account --flat
ng g c features/admin/admin --flat