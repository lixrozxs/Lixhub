'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Heart, MessageCircle, Eye, Star, TrendingUp, Users, Shield, Zap, Menu, X, Search } from 'lucide-react'

export default function Home() {
  const [activeTab, setActiveTab] = useState('trending')
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Mock data for demonstration
  const trendingAnime = [
    {
      id: '1',
      title: 'Attack on Titan Final Season',
      description: 'The final battle for humanity\'s survival begins',
      episodes: 87,
      rating: 9.0,
      status: 'Completed',
      genre: ['Action', 'Drama'],
      views: 15420,
      likes: 892
    },
    {
      id: '2',
      title: 'Demon Slayer: Swordsmith Village',
      description: 'Tanjiro ventures into the Swordsmith Village',
      episodes: 11,
      rating: 8.7,
      status: 'Completed',
      genre: ['Action', 'Historical'],
      views: 12350,
      likes: 756
    },
    {
      id: '3',
      title: 'Jujutsu Kaisen Season 2',
      description: 'Gojo and Geto\'s past is finally revealed',
      episodes: 23,
      rating: 8.9,
      status: 'Completed',
      genre: ['Action', 'School'],
      views: 18900,
      likes: 1203
    }
  ]

  const communityPosts = [
    {
      id: '1',
      title: 'Theory: Eren\'s True Plan Revealed',
      content: 'After rewatching the series, I think I figured out what Eren really wanted...',
      author: 'AnimeFan99',
      likes: 234,
      comments: 89,
      timestamp: '2 hours ago',
      tags: ['theory', 'spoilers']
    },
    {
      id: '2',
      title: 'Best Fight Scenes of 2024',
      content: 'Let\'s discuss the most epic anime battles we\'ve seen this year...',
      author: 'OtakuMaster',
      likes: 567,
      comments: 234,
      timestamp: '5 hours ago',
      tags: ['discussion', 'ranking']
    }
  ]

  const stats = [
    { label: 'Active Users', value: '12.5K', icon: Users, color: 'text-blue-600' },
    { label: 'Anime Titles', value: '3,847', icon: Star, color: 'text-yellow-600' },
    { label: 'Posts', value: '45.2K', icon: MessageCircle, color: 'text-green-600' },
    { label: 'Moderated', value: '1,234', icon: Shield, color: 'text-purple-600' }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AC</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline">Anime Community</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-48 lg:w-64"
              />
            </div>
            <Button variant="outline" size="sm" className="hidden sm:inline">
              Sign In
            </Button>
            <Button size="sm" className="hidden sm:inline">
              Join
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Sign In
                </Button>
                <Button size="sm" className="flex-1">
                  Join
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 md:py-16">
        <div className="text-center space-y-4 md:space-y-6">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
            Your Anime Community Hub
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Discover, discuss, and share your passion for anime with thousands of fans worldwide.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
            <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600">
              <Zap className="w-4 h-4 mr-2" />
              Get Started
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Browse Anime
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 md:mt-12">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6 pb-4">
                <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                <div className="text-xl md:text-2xl font-bold">{stat.value}</div>
                <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 pb-8 md:pb-16">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
            <TabsTrigger value="trending" className="text-xs md:text-sm py-2 px-2">
              <TrendingUp className="w-3 h-3 md:w-4 md:h-4 mr-1" />
              <span className="hidden xs:inline">Trending</span>
            </TabsTrigger>
            <TabsTrigger value="anime" className="text-xs md:text-sm py-2 px-2">
              📺 <span className="hidden xs:inline ml-1">Anime</span>
            </TabsTrigger>
            <TabsTrigger value="community" className="text-xs md:text-sm py-2 px-2">
              <MessageCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
              <span className="hidden xs:inline">Community</span>
            </TabsTrigger>
            <TabsTrigger value="watchlist" className="text-xs md:text-sm py-2 px-2">
              📝 <span className="hidden xs:inline ml-1">Watchlist</span>
            </TabsTrigger>
          </TabsList>

          {/* Trending Tab */}
          <TabsContent value="trending" className="mt-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-bold flex items-center">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6 mr-2 text-red-500" />
                Trending Now
              </h2>
              <Badge variant="secondary" className="text-xs">Updated hourly</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {trendingAnime.map((anime) => (
                <Card key={anime.id} className="group hover:shadow-lg transition-all cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 rounded-t-lg flex items-center justify-center">
                    <div className="text-3xl md:text-4xl">🎌</div>
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start gap-2">
                      <CardTitle className="text-base md:text-lg group-hover:text-purple-600 transition-colors line-clamp-2">
                        {anime.title}
                      </CardTitle>
                      <Badge variant="secondary" className="whitespace-nowrap text-xs">
                        ⭐ {anime.rating}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2 text-sm">
                      {anime.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {anime.genre.map((g) => (
                        <Badge key={g} variant="outline" className="text-xs px-2 py-0">
                          {g}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs md:text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2 md:space-x-4">
                        <span className="flex items-center">
                          <Eye className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                          {anime.views > 1000 ? `${(anime.views / 1000).toFixed(1)}K` : anime.views}
                        </span>
                        <span className="flex items-center">
                          <Heart className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                          {anime.likes}
                        </span>
                      </div>
                      <span>{anime.episodes} eps</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Anime Tab */}
          <TabsContent value="anime" className="mt-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-xl md:text-2xl font-bold">📺 Anime Library</h2>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">All</Button>
                <Button variant="outline" size="sm">Action</Button>
                <Button variant="outline" size="sm">Romance</Button>
                <Button variant="outline" size="sm">Comedy</Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                <Card key={i} className="group hover:shadow-lg transition-all cursor-pointer">
                  <div className="aspect-[3/4] bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 rounded-t-lg flex items-center justify-center">
                    <div className="text-2xl md:text-3xl">🎌</div>
                  </div>
                  <CardContent className="p-3">
                    <h4 className="font-semibold text-sm truncate mb-1">Anime Title {i}</h4>
                    <p className="text-xs text-muted-foreground">12 eps • 8.5⭐</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community" className="mt-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-xl md:text-2xl font-bold flex items-center">
                <MessageCircle className="w-5 h-5 md:w-6 md:h-6 mr-2 text-blue-500" />
                Community Discussions
              </h2>
              <Button>Create Post</Button>
            </div>
            
            <div className="space-y-4">
              {communityPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center space-x-3 min-w-0 flex-1">
                        <Avatar className="w-8 h-8 md:w-10 md:h-10">
                          <AvatarFallback className="text-xs">{post.author.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-sm md:text-base truncate">{post.author}</div>
                          <div className="text-xs text-muted-foreground">{post.timestamp}</div>
                        </div>
                      </div>
                      <Badge variant="outline" className="whitespace-nowrap text-xs">Discussion</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <h3 className="font-semibold text-base md:text-lg mb-2">{post.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2 text-sm md:text-base">
                      {post.content}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <button className="flex items-center hover:text-red-500 transition-colors">
                          <Heart className="w-4 h-4 mr-1" />
                          {post.likes}
                        </button>
                        <button className="flex items-center hover:text-blue-500 transition-colors">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {post.comments}
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Watchlist Tab */}
          <TabsContent value="watchlist" className="mt-6">
            <Card>
              <CardContent className="text-center py-12">
                <div className="text-4xl md:text-6xl mb-4">📝</div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">Your Watchlist</h3>
                <p className="text-muted-foreground mb-6 px-4">Sign in to create and manage your anime watchlist</p>
                <Button>Sign In to Continue</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground space-y-2">
            <p>© 2024 Anime Community. Built with ❤️ for anime fans.</p>
            <p className="text-xs">Enhanced moderation system • Safe community • Quality content</p>
          </div>
        </div>
      </footer>
    </div>
  )
}