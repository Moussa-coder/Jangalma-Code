import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Users,
  Star,
  BookOpen,
  Heart,
  Download,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Share2,
  MoreVertical,
  Flag,
  CheckCircle2,
  Eye,
  Calendar,
  Filter,
  Reply,
  ChevronDown,
  Copy,
  Facebook,
  Twitter,
  LinkedinIcon,
  Link2,
} from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Données des cours
const courses: Array<{
  id: number;
  title: string;
  description: string;
  domain: string;
  instructor: string;
  instructorId: string;
  duration: string;
  students: number;
  rating: number;
  price: string;
  level: string;
  image: string;
  fullDescription: string;
  videoUrl: string;
  views: number;
  publishedDate: string;
  instructorSubscribers: string;
}> = [];

// Commentaires avec réponses
const initialComments: Array<{
  id: number;
  author: string;
  avatar: string;
  date: string;
  content: string;
  likes: number;
  dislikes: number;
  replies: Array<{
    id: number;
    author: string;
    avatar: string;
    date: string;
    content: string;
    likes: number;
  }>;
}> = [];

type CommentSort = "recent" | "popular" | "oldest";

const CourseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const course = courses.find((c) => c.id === parseInt(id || "0"));

  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [commentSort, setCommentSort] = useState<CommentSort>("popular");
  const [likedComments, setLikedComments] = useState<number[]>([]);
  const [dislikedComments, setDislikedComments] = useState<number[]>([]);

  // Suggestions de cours similaires
  const suggestedCourses = courses
    .filter((c) => c.id !== course?.id && (c.domain === course?.domain || c.instructor === course?.instructor))
    .slice(0, 5);

  const instructorId = course?.instructorId ? parseInt(course.instructorId) : 0;

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <main className="flex-1 pt-4 pb-16 transition-all duration-300">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Cours non trouvé</h1>
            <Button onClick={() => navigate("/cours")}>Retour aux cours</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleLike = () => {
    if (isDisliked) {
      setIsDisliked(false);
      setDislikesCount((prev) => prev - 1);
    }
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleDislike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikesCount((prev) => prev - 1);
    }
    setIsDisliked(!isDisliked);
    setDislikesCount((prev) => (isDisliked ? prev - 1 : prev + 1));
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  const handleDownload = () => {
    alert("Téléchargement du cours en cours...");
  };

  const handleEnroll = () => {
    toast.success(`Vous êtes maintenant inscrit au cours "${course.title}" !`);
    // Rediriger vers le tableau de bord après inscription
    setTimeout(() => {
      navigate("/tableau-de-bord");
    }, 1500);
  };

  const handleShare = (platform?: string) => {
    const url = window.location.href;
    const title = course.title;
    const text = `Découvrez le cours "${course.title}" sur Jangalma Code`;

    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      toast.success("Lien copié dans le presse-papiers !");
      return;
    }

    if (platform === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        "_blank"
      );
      return;
    }

    if (platform === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
        "_blank"
      );
      return;
    }

    if (platform === "linkedin") {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        "_blank"
      );
      return;
    }

    // Partage natif si disponible
    if (navigator.share) {
      navigator.share({
        title: title,
        text: text,
        url: url,
      });
    } else {
      // Fallback: copier le lien
      navigator.clipboard.writeText(url);
      toast.success("Lien copié dans le presse-papiers !");
    }
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: "Vous",
        avatar: "VO",
        date: "À l'instant",
        content: newComment,
        likes: 0,
        dislikes: 0,
        replies: [],
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  const handleSubmitReply = (commentId: number) => {
    if (replyContent.trim()) {
      setComments(
        comments.map((c) =>
          c.id === commentId
            ? {
                ...c,
                replies: [
                  ...c.replies,
                  {
                    id: Date.now(),
                    author: "Vous",
                    avatar: "VO",
                    date: "À l'instant",
                    content: replyContent,
                    likes: 0,
                  },
                ],
              }
            : c
        )
      );
      setReplyContent("");
      setReplyingTo(null);
    }
  };

  const handleLikeComment = (commentId: number) => {
    if (likedComments.includes(commentId)) {
      setLikedComments(likedComments.filter((id) => id !== commentId));
      setComments(
        comments.map((c) =>
          c.id === commentId ? { ...c, likes: c.likes - 1 } : c
        )
      );
    } else {
      if (dislikedComments.includes(commentId)) {
        setDislikedComments(dislikedComments.filter((id) => id !== commentId));
        setComments(
          comments.map((c) =>
            c.id === commentId
              ? { ...c, dislikes: c.dislikes - 1, likes: c.likes + 1 }
              : c
          )
        );
      } else {
        setComments(
          comments.map((c) =>
            c.id === commentId ? { ...c, likes: c.likes + 1 } : c
          )
        );
      }
      setLikedComments([...likedComments, commentId]);
    }
  };

  const handleDislikeComment = (commentId: number) => {
    if (dislikedComments.includes(commentId)) {
      setDislikedComments(dislikedComments.filter((id) => id !== commentId));
      setComments(
        comments.map((c) =>
          c.id === commentId ? { ...c, dislikes: c.dislikes - 1 } : c
        )
      );
    } else {
      if (likedComments.includes(commentId)) {
        setLikedComments(likedComments.filter((id) => id !== commentId));
        setComments(
          comments.map((c) =>
            c.id === commentId
              ? { ...c, likes: c.likes - 1, dislikes: c.dislikes + 1 }
              : c
          )
        );
      } else {
        setComments(
          comments.map((c) =>
            c.id === commentId ? { ...c, dislikes: c.dislikes + 1 } : c
          )
        );
      }
      setDislikedComments([...dislikedComments, commentId]);
    }
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (commentSort === "popular") {
      return b.likes - a.likes;
    } else if (commentSort === "recent") {
      return 0; // Already in order
    } else {
      return a.id - b.id;
    }
  });

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-4 pb-16 transition-all duration-300">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/cours")}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux cours
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contenu principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Lecteur vidéo */}
              <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
                <iframe
                  src={course.videoUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={course.title}
                />
              </div>

              {/* Titre et métadonnées */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary">{course.level}</Badge>
                  <Badge variant={course.price === "Gratuit" ? "default" : "outline"}>
                    {course.price}
                  </Badge>
                  <Badge variant="outline">{course.domain}</Badge>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold mb-4">{course.title}</h1>

                {/* Métadonnées YouTube-style */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {formatViews(course.views)} vues
                    </span>
                    <span>•</span>
                    <span>{course.publishedDate}</span>
                  </div>

                  {/* Actions principales */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLike}
                      className={isLiked ? "bg-primary text-primary-foreground" : ""}
                    >
                      <ThumbsUp className={`h-4 w-4 mr-1 ${isLiked ? "fill-current" : ""}`} />
                      {likesCount}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDislike}
                      className={isDisliked ? "bg-destructive text-destructive-foreground" : ""}
                    >
                      <ThumbsDown className={`h-4 w-4 mr-1 ${isDisliked ? "fill-current" : ""}`} />
                      {dislikesCount}
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleFavorite}>
                      <Heart className={`h-4 w-4 mr-1 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                      {isFavorite ? "Retiré" : "Favoris"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleDownload}>
                      <Download className="h-4 w-4 mr-1" />
                      Télécharger
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Share2 className="h-4 w-4 mr-1" />
                          Partager
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleShare("copy")}>
                          <Copy className="h-4 w-4 mr-2" />
                          Copier le lien
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleShare("facebook")}>
                          <Facebook className="h-4 w-4 mr-2" />
                          Partager sur Facebook
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare("twitter")}>
                          <Twitter className="h-4 w-4 mr-2" />
                          Partager sur Twitter
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare("linkedin")}>
                          <LinkedinIcon className="h-4 w-4 mr-2" />
                          Partager sur LinkedIn
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleShare()}>
                          <Link2 className="h-4 w-4 mr-2" />
                          Partager via...
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Flag className="h-4 w-4 mr-2" />
                          Signaler
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleDownload}>
                          <Download className="h-4 w-4 mr-2" />
                          Télécharger le cours
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Share2 className="h-4 w-4 mr-2" />
                          Partager
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>

              {/* Informations instructeur - Version professionnelle */}
              <Card className="cursor-pointer hover:shadow-lg transition-shadow group" onClick={() => navigate(`/instructeurs/${instructorId}`)}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16 border-2 border-primary/20 group-hover:border-primary transition-colors">
                      <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                        {course.instructor
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {course.instructor}
                        </h3>
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{course.instructorSubscribers} abonnés</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          <span className="text-primary font-medium">Voir le profil complet →</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {course.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant={isSubscribed ? "secondary" : "default"}
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSubscribe();
                          }}
                          className={isSubscribed ? "" : "bg-gradient-primary"}
                        >
                          {isSubscribed ? "Abonné" : "S'abonner"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/instructeurs/${instructorId}`);
                          }}
                        >
                          Voir le profil complet
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <h2 className="text-xl font-semibold">À propos de ce cours</h2>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      <span>{formatViews(course.views)} vues</span>
                      <span>•</span>
                      <Calendar className="h-4 w-4" />
                      <span>{course.publishedDate}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {course.fullDescription || course.description}
                  </p>
                </CardContent>
              </Card>

              {/* Commentaires */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      <h2 className="text-xl font-semibold">
                        {comments.reduce((acc, c) => acc + 1 + c.replies.length, 0)} commentaires
                      </h2>
                    </div>
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-muted-foreground" />
                      <Select value={commentSort} onValueChange={(v) => setCommentSort(v as CommentSort)}>
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="popular">Les plus pertinents</SelectItem>
                          <SelectItem value="recent">Les plus récents</SelectItem>
                          <SelectItem value="oldest">Les plus anciens</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Formulaire de commentaire */}
                  <form onSubmit={handleSubmitComment} className="mb-6">
                    <div className="flex gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          VO
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Textarea
                          placeholder="Ajoutez un commentaire public..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="mb-2 min-h-[80px]"
                        />
                        <div className="flex justify-end gap-2">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setNewComment("")}
                          >
                            Annuler
                          </Button>
                          <Button type="submit" size="sm" className="bg-gradient-primary">
                            Commenter
                          </Button>
                        </div>
                      </div>
                    </div>
                  </form>

                  {/* Liste des commentaires */}
                  <div className="space-y-6">
                    {sortedComments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {comment.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-start gap-2 mb-1">
                            <span className="font-semibold text-sm">{comment.author}</span>
                            <span className="text-xs text-muted-foreground">
                              {comment.date}
                            </span>
                          </div>
                          <p className="text-sm mb-3">{comment.content}</p>
                          <div className="flex items-center gap-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleLikeComment(comment.id)}
                              className="h-8 text-muted-foreground"
                            >
                              <ThumbsUp
                                className={`h-4 w-4 mr-1 ${
                                  likedComments.includes(comment.id)
                                    ? "fill-primary text-primary"
                                    : ""
                                }`}
                              />
                              {comment.likes}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDislikeComment(comment.id)}
                              className="h-8 text-muted-foreground"
                            >
                              <ThumbsDown
                                className={`h-4 w-4 mr-1 ${
                                  dislikedComments.includes(comment.id)
                                    ? "fill-destructive text-destructive"
                                    : ""
                                }`}
                              />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                              className="h-8 text-muted-foreground"
                            >
                              <Reply className="h-4 w-4 mr-1" />
                              Répondre
                            </Button>
                          </div>

                          {/* Formulaire de réponse */}
                          {replyingTo === comment.id && (
                            <div className="mt-4 ml-4 pl-4 border-l-2">
                              <div className="flex gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                    VO
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <Textarea
                                    placeholder="Ajoutez une réponse..."
                                    value={replyContent}
                                    onChange={(e) => setReplyContent(e.target.value)}
                                    className="mb-2 min-h-[60px]"
                                  />
                                  <div className="flex justify-end gap-2">
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => {
                                        setReplyingTo(null);
                                        setReplyContent("");
                                      }}
                                    >
                                      Annuler
                                    </Button>
                                    <Button
                                      type="button"
                                      size="sm"
                                      onClick={() => handleSubmitReply(comment.id)}
                                      className="bg-gradient-primary"
                                    >
                                      Répondre
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Réponses */}
                          {comment.replies.length > 0 && (
                            <div className="mt-4 ml-4 pl-4 border-l-2 space-y-4">
                              {comment.replies.map((reply) => (
                                <div key={reply.id} className="flex gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                      {reply.avatar}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex items-start gap-2 mb-1">
                                      <span className="font-semibold text-xs">{reply.author}</span>
                                      <span className="text-xs text-muted-foreground">
                                        {reply.date}
                                      </span>
                                    </div>
                                    <p className="text-sm mb-2">{reply.content}</p>
                                    <div className="flex items-center gap-4">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 text-xs text-muted-foreground"
                                      >
                                        <ThumbsUp className="h-3 w-3 mr-1" />
                                        {reply.likes}
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 text-xs text-muted-foreground"
                                      >
                                        <Reply className="h-3 w-3 mr-1" />
                                        Répondre
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                              {comment.replies.length > 0 && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-primary"
                                  onClick={() => setReplyingTo(comment.id)}
                                >
                                  <ChevronDown className="h-4 w-4 mr-1" />
                                  Voir {comment.replies.length} réponse{comment.replies.length > 1 ? "s" : ""}
                                </Button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              {/* CTA d'inscription */}
              <Card>
                <CardContent className="p-6">
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-primary mb-3"
                    onClick={handleEnroll}
                  >
                    S'inscrire au cours
                  </Button>
                  <p className="text-sm text-muted-foreground text-center">
                    Accédez à tous les contenus et ressources
                  </p>
                </CardContent>
              </Card>

              {/* Statistiques */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Statistiques</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Étudiants</span>
                      <span className="font-semibold">{course.students}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Note</span>
                      <span className="font-semibold">{course.rating}/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Durée</span>
                      <span className="font-semibold">{course.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Vues</span>
                      <span className="font-semibold">{formatViews(course.views)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Suggestions de cours */}
              {suggestedCourses.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-4">Cours suggérés</h3>
                  <div className="space-y-3">
                    {suggestedCourses.map((suggested) => (
                      <div
                        key={suggested.id}
                        className="flex gap-3 cursor-pointer group"
                        onClick={() => navigate(`/cours/${suggested.id}`)}
                      >
                        <div className={`w-40 h-24 ${suggested.image} rounded-lg flex-shrink-0 flex items-center justify-center`}>
                          <span className="text-white text-2xl font-bold opacity-20">
                            {suggested.title.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors mb-1">
                            {suggested.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mb-1">
                            {suggested.instructor}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Eye className="h-3 w-3" />
                            <span>{formatViews(suggested.views)}</span>
                            <span>•</span>
                            <span>{suggested.publishedDate}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetailPage;
