// app/index.tsx
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Play, 
  Music, 
  ChevronRight,
  Download,
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const gradientColors = [
  ['#8B5CF6', '#EC4899', '#F43F5E'], // purple-pink-rose
  ['#2563EB', '#06B6D4', '#0D9488'], // blue-cyan-teal
  ['#10B981', '#34D399', '#84CC16'], // emerald-green-lime
  ['#7C3AED', '#A855F7', '#D946EF'], // violet-purple-fuchsia
  ['#F97316', '#EF4444', '#EC4899'], // orange-red-pink
];

export default function MusicAppLandingPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);
  const rotateAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(1);
  const fadeAnim = new Animated.Value(0);

  // Color rotation animation
  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % gradientColors.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  // Rotation animation for music icon
  useEffect(() => {
    if (isPlaying) {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 20000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      rotateAnim.setValue(0);
    }
  }, [isPlaying,rotateAnim]);

  // Button scale animation
  const buttonScale = scaleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.05]
  });

  // Fade in animation
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* Animated Background */}
      <LinearGradient
        colors={gradientColors[colorIndex]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.backgroundGradient, { opacity: 0.2 }]}
      >
        <Animated.View
          style={[
            styles.animatedBackground,
            {
              transform: [
                {
                  scale: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.1]
                  })
                },
                {
                  rotate: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '1deg']
                  })
                }
              ]
            }
          ]}
        />
      </LinearGradient>
      
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)', '#000']}
        style={styles.overlayGradient}
      />

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <Animated.View 
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0]
              })}]
            }
          ]}
        >
          <View style={styles.logoContainer}>
            <Animated.View
              style={{
                transform: [{ rotate: rotateInterpolate }]
              }}
            >
              <Music size={32} color="#A855F7" />
            </Animated.View>
            <Text style={styles.logoText}>Melodify</Text>
          </View>
        </Animated.View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          {/* Animated Album Art */}
          <Animated.View
            style={[
              styles.albumArtContainer,
              {
                opacity: fadeAnim,
                transform: [
                  { scale: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1]
                  })}
                ]
              }
            ]}
          >
            <LinearGradient
              colors={gradientColors[colorIndex]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.albumArt}
            >
              <Animated.View
                style={[
                  styles.albumArtInner,
                  {
                    transform: [{ rotate: rotateInterpolate }]
                  }
                ]}
              >
                <View style={styles.albumArtCenter}>
                  <Music size={64} color="white" />
                </View>
              </Animated.View>
              
              {/* Play/Pause Button */}
              <TouchableOpacity
                style={styles.playButton}
                onPress={() => setIsPlaying(!isPlaying)}
                activeOpacity={0.8}
              >
                {isPlaying ? (
                  <View style={styles.playingIndicator}>
                    <View style={[styles.bar, { height: 16 }]} />
                    <View style={[styles.bar, { height: 24, marginHorizontal: 2 }]} />
                    <View style={[styles.bar, { height: 16 }]} />
                  </View>
                ) : (
                  <Play size={20} color="black" />
                )}
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>

          {/* Main Title */}
          <Animated.Text
            style={[
              styles.title,
              {
                opacity: fadeAnim,
                transform: [{ translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0]
                })}]
              }
            ]}
          >
            Feel The{' '}
            <Text style={[styles.gradientText, { color: '#A855F7' }]}>
              Music
            </Text>
          </Animated.Text>

          {/* Description */}
          <Animated.Text
            style={[
              styles.description,
              {
                opacity: fadeAnim,
                transform: [{ translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0]
                })}]
              }
            ]}
          >
            Play music Anywhere and anytime with us.
          </Animated.Text>

          {/* Get Started Button */}
          <Animated.View
            style={[
              styles.getStartedContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0]
                })}]
              }
            ]}
          >
            <TouchableOpacity
              style={styles.getStartedButton}
              activeOpacity={0.8}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            >
              <Animated.View
                style={[
                  styles.getStartedButtonInner,
                  {
                    transform: [{ scale: buttonScale }]
                  }
                ]}
              >
                <LinearGradient
                  colors={gradientColors[colorIndex]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.getStartedGradient}
                >
                  <View style={styles.buttonContent}>
                    <Text style={styles.getStartedText}>Get Started Free</Text>
                    <Animated.View
                      style={{
                        transform: [{
                          translateX: fadeAnim.interpolate({
                            inputRange: [0, 0.5, 1],
                            outputRange: [0, 5, 0]
                          })
                        }]
                      }}
                    >
                      <ChevronRight size={20} color="white" />
                    </Animated.View>
                  </View>
                </LinearGradient>
              </Animated.View>
            </TouchableOpacity>
            
            {/* Download Links */}
            <Animated.View 
              style={[
                styles.downloadLinks,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0]
                  })}]
                }
              ]}
            >
            </Animated.View>
          </Animated.View>
        </View>

        {/* Footer */}
        <Animated.View 
          style={[
            styles.footer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0]
              })}]
            }
          ]}
        >
          <Text style={styles.footerText}>
            © 2024 Melodify. All music rights reserved to their owners.
          </Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  animatedBackground: {
    width: '100%',
    height: '100%',
  },
  overlayGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  albumArtContainer: {
    marginBottom: 40,
  },
  albumArt: {
    width: 256,
    height: 256,
    borderRadius: 32,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  albumArtInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  albumArtCenter: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  playingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bar: {
    width: 3,
    backgroundColor: 'black',
    borderRadius: 2,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 50,
  },
  gradientText: {
    fontSize: 42,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
    maxWidth: width * 0.9,
  },
  getStartedContainer: {
    alignItems: 'center',
  },
  getStartedButton: {
    width: '100%',
    maxWidth: 320,
  },
  getStartedButtonInner: {
    borderRadius: 50,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  getStartedGradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  getStartedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  downloadLinks: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 24,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  downloadText: {
    fontSize: 14,
    color: 'white',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
    marginBottom: 8,
  },
});