import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ToastAndroid,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { useAuth } from '../components/AuthContext';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { getRobotoFont } from '../utils/fonts';
import { ArrowLeft } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 380;
const LOGO_URL = 'https://res.cloudinary.com/djd2pcr44/image/upload/v1758717717/ChatGPT_Image_Sep_24_2025_06_11_37_PM_ndldy3.png';

export default function PasswordResetScreen() {
    const { resetPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    // Email validation function
    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
        if (!email) {
            return 'Email is required';
        }
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address';
        }
        return '';
    };

    // Cross-platform toast function
    const showToast = (message: string) => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(message, ToastAndroid.LONG);
        } else {
            Alert.alert('', message);
        }
    };

    // Handle email input change
    const handleEmailChange = (text: string) => {
        setEmail(text);
        if (emailError) {
            setEmailError('');
        }
    };

    const handleResetPassword = async () => {
        // Validate email
        const emailErr = validateEmail(email);
        setEmailError(emailErr);

        if (emailErr) {
            showToast('Please enter a valid email address');
            return;
        }

        setLoading(true);
        try {
            await resetPassword(email);
            setSuccess(true);
            showToast('Password reset email sent successfully!');
        } catch (e: any) {
            console.error('Password reset error:', e);
            let errorMessage = 'Failed to send password reset email. Please try again.';

            if (e.code === 'auth/user-not-found') {
                errorMessage = 'No account found with this email address';
            } else if (e.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email address format';
            } else if (e.message) {
                errorMessage = e.message;
            }

            showToast(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Clean gradient background */}
            <LinearGradient
                colors={['#ffffff', '#f8fafc', '#ffffff']}
                style={styles.background}
            >
                <KeyboardAvoidingView
                    style={styles.keyboardView}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* Logo Section */}
                        <View style={styles.logoSection}>
                            <View style={styles.heroIconContainer}>
                                <TouchableOpacity onPress={() => router.push('/')}>
                                    <Image
                                        source={{
                                            uri: LOGO_URL
                                        }}
                                        style={styles.heroLogo}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Password Reset Card */}
                        <View style={styles.card}>
                            <TouchableOpacity
                                style={styles.backButton}
                                onPress={() => router.back()}
                            >
                                <ArrowLeft size={24} color="#2563EB" strokeWidth={2} />
                            </TouchableOpacity>

                            {!success ? (
                                <>
                                    <Text style={styles.title}>Reset Password</Text>
                                    <Text style={styles.subtitle}>
                                        Enter your email address and we'll send you a link to reset your password
                                    </Text>

                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={[styles.input, emailError ? styles.inputError : null]}
                                            placeholder="Email"
                                            value={email}
                                            onChangeText={handleEmailChange}
                                            autoCapitalize="none"
                                            keyboardType="email-address"
                                            placeholderTextColor="#9CA3AF"
                                            autoCorrect={false}
                                        />
                                        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                                    </View>

                                    <Pressable
                                        style={[styles.button, loading ? styles.buttonDisabled : null]}
                                        onPress={handleResetPassword}
                                        disabled={loading}
                                    >
                                        <Text style={styles.buttonText}>
                                            {loading ? 'Sending...' : 'Send Reset Link'}
                                        </Text>
                                    </Pressable>

                                    <Pressable onPress={() => router.push('/login')} style={styles.link}>
                                        <Text style={styles.linkText}>Back to Login</Text>
                                    </Pressable>
                                </>
                            ) : (
                                <>
                                    <Text style={styles.successTitle}>✓ Email Sent!</Text>
                                    <Text style={styles.successSubtitle}>
                                        We've sent a password reset link to {email}.
                                        {'\n\n'}
                                        Check your inbox and follow the instructions to reset your password.
                                    </Text>

                                    <Pressable
                                        style={styles.button}
                                        onPress={() => router.push('/login')}
                                    >
                                        <Text style={styles.buttonText}>Return to Login</Text>
                                    </Pressable>
                                </>
                            )}
                        </View>

                        {/* Bottom Spacing */}
                        <View style={styles.bottomSpacing} />
                    </ScrollView>
                </KeyboardAvoidingView>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    logoSection: {
        alignItems: 'center',
        marginBottom: isSmallScreen ? 40 : 40,
    },
    heroIconContainer: {
        width: isSmallScreen ? 120 : 140,
        height: isSmallScreen ? 120 : 140,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroLogo: {
        width: 140,
        height: 140,
        marginBottom: -30,
    },
    card: {
        width: isSmallScreen ? width - 40 : 340,
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        borderRadius: 24,
        padding: isSmallScreen ? 24 : 32,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
        borderWidth: 1,
        borderColor: 'rgba(14, 165, 233, 0.1)',
        alignSelf: 'center',
        marginTop: -48,
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: 20,
        padding: 8,
        zIndex: 1,
    },
    title: {
        fontSize: isSmallScreen ? 20 : 22,
        fontWeight: '700',
        marginBottom: 8,
        marginTop: 16,
        color: '#0EA5E9',
        textAlign: 'center',
        letterSpacing: -0.5,
        fontFamily: getRobotoFont('bold'),
    },
    subtitle: {
        fontSize: isSmallScreen ? 14 : 15,
        color: '#6B7280',
        marginBottom: 24,
        textAlign: 'center',
        fontWeight: '500',
        fontFamily: getRobotoFont('medium'),
        lineHeight: 20,
    },
    successTitle: {
        fontSize: isSmallScreen ? 24 : 28,
        fontWeight: '700',
        marginBottom: 16,
        color: '#10B981',
        textAlign: 'center',
        fontFamily: getRobotoFont('bold'),
    },
    successSubtitle: {
        fontSize: isSmallScreen ? 14 : 15,
        color: '#4B5563',
        marginBottom: 32,
        textAlign: 'center',
        fontWeight: '500',
        fontFamily: getRobotoFont('medium'),
        lineHeight: 22,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 16,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 12,
        paddingHorizontal: 16,
        marginBottom: 4,
        fontSize: isSmallScreen ? 15 : 16,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        color: '#1f2937',
        fontFamily: getRobotoFont('regular'),
        fontWeight: '400',
    },
    inputError: {
        borderColor: '#EF4444',
        backgroundColor: 'rgba(254, 242, 242, 0.95)',
    },
    errorText: {
        color: '#ef4444',
        fontSize: 13,
        marginTop: 6,
        marginLeft: 6,
        fontWeight: '600',
        fontFamily: getRobotoFont('medium'),
    },
    button: {
        width: '100%',
        backgroundColor: '#0EA5E9',
        paddingVertical: isSmallScreen ? 14 : 16,
        borderRadius: 16,
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 16,
        shadowColor: '#0EA5E9',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: '800',
        fontSize: isSmallScreen ? 16 : 18,
        letterSpacing: 0.5,
        fontFamily: getRobotoFont('bold'),
    },
    link: {
        marginTop: 16,
    },
    linkText: {
        color: '#2563eb',
        fontWeight: '600',
        fontSize: isSmallScreen ? 14 : 15,
        textAlign: 'center',
        fontFamily: getRobotoFont('medium'),
    },
    bottomSpacing: {
        height: isSmallScreen ? 20 : 40,
    },
});
