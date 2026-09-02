import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Play, Users, Plus, Video, Clock, BookOpen } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  subject: string;
  class: string;
  source: 'youtube' | 'file';
  thumbnail: string;
  duration: string;
}

interface LiveClass {
  id: string;
  title: string;
  subject: string;
  time: string;
  instructor: string;
  status: 'upcoming' | 'live' | 'ended';
}

interface User {
  id: string;
  username: string;
  password: string;
  createdAt: string;
}

export default function Index() {
  const [activeTab, setActiveTab] = useState('playlist');
  const [videos, setVideos] = useState<VideoItem[]>([
    {
      id: '1',
      title: 'Introduction to Algebra',
      subject: 'Mathematics',
      class: 'Class 9',
      source: 'youtube',
      thumbnail: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=300&fit=crop',
      duration: '45:30',
    },
    {
      id: '2',
      title: 'Photosynthesis Explained',
      subject: 'Biology',
      class: 'Class 10',
      source: 'file',
      thumbnail: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400&h=300&fit=crop',
      duration: '38:15',
    },
    {
      id: '3',
      title: 'World War II History',
      subject: 'History',
      class: 'Class 11',
      source: 'youtube',
      thumbnail: 'https://images.unsplash.com/photo-1507842217343-583f7270bfba?w=400&h=300&fit=crop',
      duration: '52:45',
    },
  ]);

  const [liveClasses, setLiveClasses] = useState<LiveClass[]>([
    {
      id: 'live1',
      title: 'Geometry Fundamentals',
      subject: 'Mathematics',
      time: 'Today at 3:00 PM',
      instructor: 'Mr. Smith',
      status: 'upcoming',
    },
    {
      id: 'live2',
      title: 'English Literature Discussion',
      subject: 'English',
      time: 'Tomorrow at 2:00 PM',
      instructor: 'Ms. Johnson',
      status: 'upcoming',
    },
    {
      id: 'live3',
      title: 'Chemistry Lab Session',
      subject: 'Chemistry',
      time: 'Today at 1:00 PM',
      instructor: 'Dr. Williams',
      status: 'live',
    },
  ]);

  const [users, setUsers] = useState<User[]>([
    { id: '1', username: 'student1', password: 'pass123', createdAt: '2024-01-15' },
    { id: '2', username: 'student2', password: 'pass456', createdAt: '2024-01-16' },
  ]);

  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [selectedClass, setSelectedClass] = useState('Class 9');

  const handleAddUser = () => {
    if (newUsername && newPassword) {
      const newUser: User = {
        id: String(users.length + 1),
        username: newUsername,
        password: newPassword,
        createdAt: new Date().toLocaleDateString(),
      };
      setUsers([...users, newUser]);
      setNewUsername('');
      setNewPassword('');
    }
  };

  const handleAddYoutubeVideo = () => {
    if (youtubeUrl && videoTitle) {
      const newVideo: VideoItem = {
        id: String(videos.length + 1),
        title: videoTitle,
        subject: selectedSubject,
        class: selectedClass,
        source: 'youtube',
        thumbnail: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=300&fit=crop',
        duration: '00:00',
      };
      setVideos([...videos, newVideo]);
      setYoutubeUrl('');
      setVideoTitle('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <BookOpen className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">EduLearn</h1>
          </div>
          <p className="text-muted-foreground">Video Learning Platform with Live Classes</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white">
            <TabsTrigger value="playlist" className="flex gap-2">
              <Video className="w-4 h-4" />
              Playlist
            </TabsTrigger>
            <TabsTrigger value="live" className="flex gap-2">
              <Play className="w-4 h-4" />
              Live Classes
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex gap-2">
              <Users className="w-4 h-4" />
              Admin
            </TabsTrigger>
          </TabsList>

          {/* Playlist Tab */}
          <TabsContent value="playlist" className="space-y-6">
            <Card className="bg-white border-border">
              <CardHeader>
                <CardTitle>Upload Video</CardTitle>
                <CardDescription>Add videos from YouTube or upload from your device</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Video Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter video title"
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                      className="border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="youtube">YouTube URL</Label>
                    <Input
                      id="youtube"
                      placeholder="https://youtube.com/watch?v=..."
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      className="border-border"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <select
                      id="subject"
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                    >
                      <option>Mathematics</option>
                      <option>Biology</option>
                      <option>Chemistry</option>
                      <option>Physics</option>
                      <option>English</option>
                      <option>History</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="class">Class</Label>
                    <select
                      id="class"
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                    >
                      <option>Class 9</option>
                      <option>Class 10</option>
                      <option>Class 11</option>
                      <option>Class 12</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddYoutubeVideo} className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add YouTube Video
                  </Button>
                  <Button variant="outline" className="border-border">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload File
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Video Grid */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Video Library</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {videos.map((video) => (
                  <Card key={video.id} className="bg-white border-border overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-40 bg-muted overflow-hidden">
                      <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-colors flex items-center justify-center">
                        <Play className="w-12 h-12 text-white opacity-0 hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{video.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{video.subject}</span>
                        <span className="text-xs bg-secondary/10 text-secondary-foreground px-2 py-1 rounded">{video.class}</span>
                      </div>
                      <Button variant="outline" className="w-full border-border text-foreground hover:bg-secondary/10">
                        <Play className="w-4 h-4 mr-2" />
                        Watch Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Live Classes Tab */}
          <TabsContent value="live" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {liveClasses.map((liveClass) => (
                <Card key={liveClass.id} className={`border-2 ${liveClass.status === 'live' ? 'border-destructive bg-destructive/5' : 'bg-white border-border'}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-lg text-foreground">{liveClass.title}</CardTitle>
                      {liveClass.status === 'live' && (
                        <div className="flex items-center gap-1 bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full animate-pulse">
                          <div className="w-2 h-2 bg-destructive-foreground rounded-full"></div>
                          LIVE
                        </div>
                      )}
                    </div>
                    <CardDescription>{liveClass.subject}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {liveClass.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      Instructor: {liveClass.instructor}
                    </div>
                    <Button className={`w-full ${liveClass.status === 'live' ? 'bg-destructive hover:bg-destructive/90' : 'bg-primary hover:bg-primary/90'} text-primary-foreground`}>
                      {liveClass.status === 'live' ? 'Join Now' : 'Notify Me'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Admin Tab */}
          <TabsContent value="admin" className="space-y-6">
            <Card className="bg-white border-border">
              <CardHeader>
                <CardTitle>Create User Account</CardTitle>
                <CardDescription>Generate login credentials for students</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      placeholder="student_username"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      className="border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="border-border"
                    />
                  </div>
                </div>
                <Button onClick={handleAddUser} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Create User
                </Button>
              </CardContent>
            </Card>

            {/* Users List */}
            <Card className="bg-white border-border">
              <CardHeader>
                <CardTitle>Active Users</CardTitle>
                <CardDescription>Total: {users.length} users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-border">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Username</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Password</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b border-border hover:bg-muted/50">
                          <td className="py-3 px-4 text-foreground">{user.username}</td>
                          <td className="py-3 px-4 text-muted-foreground font-mono text-xs">{user.password}</td>
                          <td className="py-3 px-4 text-muted-foreground">{user.createdAt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
