/**
 * Consumer Application
 * This app demonstrates how to use the shared utility library
 */

const { 
    capitalizeWords, 
    generateId, 
    isValidEmail, 
    formatDate, 
    debounce,
    formatCurrency
} = require('@natashakediacts/shared-utils');

console.log('🚀 Consumer App Started - Using Shared Library!\n');

// Simulate a user registration system
class UserManager {
    constructor() {
        this.users = [];
        // Create a debounced search function
        this.debouncedSearch = debounce(this.performSearch.bind(this), 300);
    }

    registerUser(name, email) {
        console.log('📝 Registering new user...');
        
        // Validate email using shared utility
        if (!isValidEmail(email)) {
            console.log(`❌ Invalid email: ${email}`);
            return false;
        }

        // Format name using shared utility
        const formattedName = capitalizeWords(name);
        
        // Generate unique ID using shared utility
        const userId = generateId(12);
        
        // Get current date using shared utility
        const registrationDate = formatDate();

        const user = {
            id: userId,
            name: formattedName,
            email: email,
            registrationDate: registrationDate
        };

        this.users.push(user);
        console.log(`✅ User registered successfully:`, user);
        return true;
    }

    performSearch(query) {
        console.log(`🔍 Searching for: "${query}"`);
        const results = this.users.filter(user => 
            user.name.toLowerCase().includes(query.toLowerCase()) ||
            user.email.toLowerCase().includes(query.toLowerCase())
        );
        console.log(`📊 Found ${results.length} user(s):`, results);
    }

    searchUsers(query) {
        // This will be debounced, so rapid calls won't trigger multiple searches
        this.debouncedSearch(query);
    }

    listAllUsers() {
        console.log('\n👥 All registered users:');
        this.users.forEach(user => {
            console.log(`   • ${user.name} (${user.email}) - ID: ${user.id} - Registered: ${user.registrationDate}`);
        });
    }
}

// Demo the application
async function runDemo() {
    const userManager = new UserManager();

    console.log('='.repeat(60));
    console.log('Demo 1: User Registration with Shared Utilities');
    console.log('='.repeat(60));

    // Test user registration
    userManager.registerUser('john doe', 'john@example.com');
    userManager.registerUser('JANE SMITH', 'jane.smith@company.org');
    userManager.registerUser('bob wilson', 'invalid-email'); // This should fail
    userManager.registerUser('alice JOHNSON', 'alice@test.co.uk');

    console.log('\n' + '='.repeat(60));
    console.log('Demo 2: Search Functionality with Debouncing');
    console.log('='.repeat(60));

    // Test debounced search (rapid calls)
    console.log('\n🔄 Testing debounced search (calling search 3 times rapidly):');
    userManager.searchUsers('john');
    userManager.searchUsers('jane');  
    userManager.searchUsers('alice'); // Only this last search should execute    // Wait for debounced search to complete
    await new Promise(resolve => setTimeout(resolve, 500));

    console.log('\n' + '='.repeat(60));
    console.log('Demo 3: Currency Formatting (NEW FEATURE!)');
    console.log('='.repeat(60));

    // Demonstrate the new formatCurrency function
    console.log('\n💰 Currency formatting demonstrations:');
    
    // Various currency examples
    const amounts = [1234.56, 999.99, 50000, 0.99, 1000000];
    
    console.log('\n📊 USD Formatting:');
    amounts.forEach(amount => {
        console.log(`   $${amount} → ${formatCurrency(amount)}`);
    });
    
    console.log('\n🌍 International Currencies:');
    console.log(`   €${amounts[1]} → ${formatCurrency(amounts[1], 'EUR', 'de-DE')}`);
    console.log(`   ¥${amounts[2]} → ${formatCurrency(amounts[2], 'JPY', 'ja-JP')}`);
    console.log(`   £${amounts[0]} → ${formatCurrency(amounts[0], 'GBP', 'en-GB')}`);
    console.log(`   ₹${amounts[4]} → ${formatCurrency(amounts[4], 'INR', 'en-IN')}`);
    
    console.log('\n🛡️ Error handling:');
    console.log(`   Invalid input → ${formatCurrency('not-a-number')}`);
    console.log(`   Null input → ${formatCurrency(null)}`);
    console.log(`   Zero amount → ${formatCurrency(0)}`);

    console.log('\n' + '='.repeat(60));
    console.log('Demo 4: Additional Utility Functions');
    console.log('='.repeat(60));

    // Demonstrate other utilities
    console.log('\n🔧 Other utility demonstrations:');
    
    // Generate various IDs
    console.log(`📌 Short ID: ${generateId(6)}`);
    console.log(`📌 Long ID: ${generateId(16)}`);
    
    // Format various strings
    console.log(`📝 Formatted: "${capitalizeWords('hello WORLD from JAVASCRIPT')}" `);
    
    // Validate emails
    const testEmails = ['test@valid.com', 'invalid.email', 'user@domain.co.uk', '@invalid.com'];
    testEmails.forEach(email => {
        console.log(`📧 "${email}" is ${isValidEmail(email) ? 'valid' : 'invalid'}`);
    });    // Format dates
    console.log(`📅 Today: ${formatDate()}`);
    console.log(`📅 Christmas 2025: ${formatDate(new Date('2025-12-25'))}`);
    console.log(`📅 New Year 2026: ${formatDate(new Date('2026-01-01'))}`);

    // NEW: Format currency amounts
    console.log(`💰 Format currency: ${formatCurrency(1234.56)}`);
    console.log(`💰 Euro format: ${formatCurrency(999.99, 'EUR', 'de-DE')}`);
    console.log(`💰 Yen format: ${formatCurrency(50000, 'JPY', 'ja-JP')}`);
    console.log(`💰 GBP format: ${formatCurrency(789.12, 'GBP', 'en-GB')}`);

    // Show all users
    userManager.listAllUsers();

    console.log('\n' + '='.repeat(60));
    console.log('✨ Demo completed successfully!');
    console.log('🎉 Shared library integration working perfectly!');
    console.log('='.repeat(60));
}

// Run the demo
runDemo().catch(console.error);
